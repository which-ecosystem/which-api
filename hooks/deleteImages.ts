import { HookContext } from '@feathersjs/feathers';
import Bluebird from 'bluebird';
import _ from 'lodash';
import Debug from 'debug';

const debug = Debug('s3-reuploads');

export default (paths: string[]) => async (context: HookContext): Promise<HookContext> => {
  const {
    service,
    app,
    id
  } = context;

  const fileService = app.service('files');
  const model = service.Model;
  const instance = await model.findOne({ _id: id });

  Bluebird.map(paths, async (path: string) => {
    const url = _.get(instance, path);

    // If image is not from our s3, fetch it!
    if (fileService.isS3url(url)) {
      debug('Found s3 url! Deleting...');
      const s3Path = fileService.getS3PathFromUrl(url);
      await fileService.deleteFile(s3Path);
      debug(`Deleted: ${s3Path}`);
    }
  });
  return context;
};

