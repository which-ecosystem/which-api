import { HookContext } from '@feathersjs/feathers';
import Bluebird from 'bluebird';
import _ from 'lodash';


export default (paths: string[]) => async (context: HookContext): Promise<HookContext> => {
  const { service, app, result, params: { user } } = context;
  const fileService = app.service('files');
  const model = service.Model;

  Bluebird.map(paths, async (path: string) => {
    const url = _.get(result, path);

    // If image is not from our s3, fetch it!
    if (!fileService.isS3url(url)) {
      const filePath = await fileService.downloadFile(url);
      const s3Path = fileService.generateS3Path(user?.username);
      const s3Url = await fileService.uploadFileToS3(filePath, s3Path);
      return model.findOneAndUpdate({ _id: result._id }, { [path]: s3Url });
    }
    return url;
  });
  return context;
};

