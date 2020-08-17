import { Application } from '@feathersjs/express';
import { Params } from '@feathersjs/feathers';
import { v4 } from 'uuid';
import axios from 'axios';
import fs from 'fs';

// Use require to avoid bug
// https://stackoverflow.com/questions/62611373/heroku-crashes-when-importing-aws-sdk
// TODO: use import statement
// eslint-disable-next-line
const S3 = require('aws-sdk/clients/s3');


export default class Files {
  public app!: Application;

  private s3!: typeof S3;

  private bucket!: string;

  async find(params: Params): Promise<string> {
    const path = this.generateS3Path(params.user?.username);
    return this.getUploadUrl(path);
  }

  public isS3url(url: string): boolean {
    return url?.startsWith(`https://${this.bucket}.s3`);
  }

  public generateS3Path(prefix = '', ext = 'png'): string {
    const key = v4();
    const fileName = `${key}.${ext}`;
    return prefix ? `${prefix}/${fileName}` : fileName;
  }

  public getS3PathFromUrl(url: string): string {
    const dotComIndex = url.indexOf('.com');
    return url.slice(dotComIndex + 5);
  }

  async getUploadUrl(path: string): Promise<string> {
    // Return signed upload URL
    return this.s3.getSignedUrl('putObject', {
      Bucket: this.bucket,
      Key: path,
      ContentType: 'image/*',
      Expires: 300
    });
  }

  async getDownloadUrl(path: string): Promise<string> {
    return this.getUploadUrl(path).then((url: string) => {
      const queryIndex = url.indexOf('?');
      return url.slice(0, queryIndex);
    });
  }

  private createTmpDir() {
    if (!fs.existsSync('tmp')) fs.mkdirSync('tmp');
  }

  async downloadFile(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.createTmpDir();
      const filePath = `tmp/${v4()}`;
      const fileStream = fs.createWriteStream(filePath);
      axios.get(url, { responseType: 'stream' })
        .then(response => {
          response.data.pipe(fileStream)
            .on('error', reject)
            .on('close', () => resolve(filePath));
        })
        .catch(error => reject(error));
    });
  }

  async uploadFileToS3(filePath: string, s3Path: string): Promise<string> {
    const fileStream = fs.createReadStream(filePath);
    await this.s3.upload({
      Bucket: this.bucket,
      Key: s3Path,
      Body: fileStream,
      ContentType: 'image/png'
    }).promise();
    fs.unlinkSync(filePath);
    return this.getDownloadUrl(s3Path);
  }

  async deleteFile(s3Path: string): Promise<void> {
    return this.s3.deleteObject({
      Bucket: this.bucket,
      Key: s3Path
    }).promise();
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

