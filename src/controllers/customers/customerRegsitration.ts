import { Request, Response, Router } from 'express';
import EcCustomers from "../../models/ec_customers";
import { base64ToBlob } from '../../utils/base64ToBlob';

const customerRegistration = async(req: Request, res: Response) :Promise<void> => {
 
    try {
      const { full_name, e_mail, password, profile_pic } = req.body;
  
      let profilePicBuffer;
      if (profile_pic) {
        try {
          profilePicBuffer= base64ToBlob(profile_pic);
        } catch (error) {
          console.error('Error converting profile_pic to Buffer:', error);
        }
      }

      const newCustomer = await EcCustomers.create({
        full_name,
        e_mail,
        password,
        profile_pic:profilePicBuffer,
      },{raw:true});

    
      // Return the newly created user
      res.status(201).json({registration_id:newCustomer .registration_id});
    } catch (error:any) {
      console.error(error);
      res.status(500).json({ error: error.toString() });
    }

  
  };
  
  export { customerRegistration };
  