import { Request, Response, Router, Express } from 'express';
import EcCustomers from "../../models/ec_customers";
import { base64ToBlob } from '../../utils/base64ToBlob';
import AWS from 'aws-sdk';
import { Readable } from 'stream';
import { s3UploadAsync } from '../../utils/s3uploadAsync';


// Configure multer to handle file uploads

const customerRegistration = async(req: Request, res: Response) :Promise<void> => {
 
    try {
      const { full_name, e_mail, password } = req.body;
      const file =req?.file as Express.Multer.File;
  
      const params: AWS.S3.PutObjectRequest = {
        Bucket: 'ecommerce123',
        Key: file?.originalname,
        Body: Readable.from(file?.buffer),
        ContentType: file?.mimetype,
      };

      try {
        const profile_pic_url = await s3UploadAsync(params);
        
        const newCustomer = await EcCustomers.create({
          full_name,
          e_mail,
          password,
          profile_pic: profile_pic_url,
        }, { raw: true });
        res.status(201).json({registration_id:newCustomer.registration_id});
      } catch (error) { 
        throw error;
      }
    } catch (error:any) {
      res.status(500).json({ error: error.toString() });
    }
  };
  
  export { customerRegistration };
  