import { Request, Response, Router } from 'express';
import EcSuppliers from "../../models/ec_suppliers";
import { base64ToBlob } from '../../utils/base64ToBlob';
import AWS from 'aws-sdk';
import { Readable } from 'stream';
import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';
import { s3UploadAsync } from '../../utils/s3uploadAsync';

const s3 = new AWS.S3({
  accessKeyId: 'AKIAW3MEC2CXQZDAUQVW',
  secretAccessKey: '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',
});

const supplierRegistration = async(req: Request, res: Response) :Promise<void> => {
 
    try {
      const { full_name, e_mail, password } = req.body;

      
      const file =req?.file as Express.Multer.File;
  
      const params: AWS.S3.PutObjectRequest = {
        Bucket: 'ecommerce123',
        Key: file?.originalname,
        Body: Readable.from(file?.buffer),
        ContentType: file?.mimetype,
      };


      // s3.upload(params, (err: Error, data: ManagedUpload.SendData) => {
      //   if (err) {
      //     // reject(err);
      //     console.log(err)
      //   } else {
      //     // resolve(data);
      //     console.log(data)
      //   }
      // });


      try {
        const profile_pic_url = await s3UploadAsync(params);
      
      const newSupplier = await EcSuppliers.create({
        full_name,
        e_mail,
        password,
        profile_pic: profile_pic_url,
      }, { raw: true });

      res.status(201).json({registration_id:newSupplier.registration_id});
      
    } catch (error) { 
      throw error;
    }

    
      // Return the newly created user
      
    } catch (error:any) {
      console.error(error);
      res.status(500).json({ error: error.toString() });
    }

  
  };
  
  export { supplierRegistration };
  