import { Request, Response, Router } from 'express';
import EcSuppliers from "../../models/ec_suppliers";
import { base64ToBlob } from '../../utils/base64ToBlob';

const supplierRegistration = async(req: Request, res: Response) :Promise<void> => {
 
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
      
      const newSupplier = await EcSuppliers.create({
        full_name,
        e_mail,
        password,
        profile_pic: profilePicBuffer,
      }, { raw: true });
      


    
      // Return the newly created user
      res.status(201).json({registration_id:newSupplier.registration_id});
    } catch (error:any) {
      console.error(error);
      res.status(500).json({ error: error.toString() });
    }

  
  };
  
  export { supplierRegistration };
  