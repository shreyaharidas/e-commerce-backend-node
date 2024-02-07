import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';
import AWS from 'aws-sdk';
import envConfig from '../config/envConfig';

const s3 = new AWS.S3({
    accessKeyId: `${envConfig.s3_access_key}`,
    secretAccessKey: `${envConfig.s3_secret_key}`,
  });

export const s3UploadAsync = (params: AWS.S3.PutObjectRequest): Promise<ManagedUpload.SendData["Location"]> => {
    return new Promise((resolve, reject) => {
      s3.upload(params, (err: Error, data: ManagedUpload.SendData) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Location);
        }
      });
    });
  };