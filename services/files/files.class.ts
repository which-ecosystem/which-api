import { Application } from '@feathersjs/express';
import { Params } from '@feathersjs/feathers';
import { v4 } from 'uuid';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { User } from 'which-types';

// Use require to avoid bug
// https://stackoverflow.com/questions/62611373/heroku-crashes-when-importing-aws-sdk
const S3 = require('aws-sdk/clients/s3');


export default class Files {
  app!: Application;
  s3!: any;
  bucket!: string;

  async find(params: Params): Promise<string> {
    const path = this.generateS3Path(params.user?.username);
    return this.getUploadUrl(path);
  }

  public isS3url(url: string): boolean {
    return url.startsWith('https://${this.bucket}.s3');
  }

  public generateS3Path(prefix='', ext='png'): string {
    const key = v4();
    const fileName = `${key}.${ext}`;
    return prefix ? `${prefix}/${fileName}` : fileName;
  }

  async getUploadUrl(path: string): Promise<string> {
    // Return signed upload URL
    return this.s3.getSignedUrl('putObject', {
      Bucket: this.bucket,
      Key: path,
      ContentType: 'image/*',
      Expires: 300,
    });
  }

  async getDownloadUrl(path: string): Promise<string> {
    return this.getUploadUrl(path).then((url: string) => {
      const queryIndex = url.indexOf('?');
      return url.slice(0, queryIndex);
    })
  }

  private createTmpDir() {
    if (!fs.existsSync('tmp')) fs.mkdirSync('tmp');
  }

  async downloadFile(url: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      this.createTmpDir();
      const filePath = `tmp/${v4()}`;
      const fileStream = fs.createWriteStream(filePath);
      const response = await axios.get(url, { responseType: 'stream' })
      response.data.pipe(fileStream)
        .on('error', reject)
        .on('close', () => resolve(filePath));
    });
  }

  async uploadFileToS3(filePath: string, s3Path: string) {
    const fileStream = fs.createReadStream(filePath);
    const request = this.s3.upload({
      Bucket: this.bucket,
      Key: s3Path,
      Body: fileStream,
      ContentType: 'image/png'
    });
    request.on('httpUploadProgress', progress => {
      console.log('progress', progress);
    })
    await request.promise();
    return this.getDownloadUrl(s3Path);
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

