import { Application } from '@feathersjs/express';
import { Params } from '@feathersjs/feathers';
import { v4 } from 'uuid';

// Use require to avoid bug
// https://stackoverflow.com/questions/62611373/heroku-crashes-when-importing-aws-sdk
const S3 = require('aws-sdk/clients/s3');


export default class Files {
  app!: Application;
  s3!: any;
  bucket!: string;

  async find(params: Params): Promise<string> {
    // Return signed upload URL
    return this.s3.getSignedUrl('putObject', {
      Bucket: this.bucket,
      Key: `${params.user?.username}/${v4()}.png`,
      ContentType: 'image/*',
      Expires: 300,
    });
  }

  setup(app: Application): void {
    this.app = app;
    this.s3 = new S3({
      accessKeyId: process.env.ACCESSKEYID,
      secretAccessKey: process.env.SECRETACCESSKEY,
      signatureVersion: 'v4',
      region: 'eu-central-1'
    });
    this.bucket = process.env.BUCKET || '';
  }
}

