import { Application } from '@feathersjs/express';
import { Params } from '@feathersjs/feathers';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';


export default class Files {
  app!: Application;
  s3!: S3;
  bucket!: string;

  async find(params: Params): Promise<string> {
    // Return signed upload URL
    return this.s3.getSignedUrl('putObject', {
      Bucket: this.bucket,
      Key: `${params.user?.username}/${uuidv4()}.png`,
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

