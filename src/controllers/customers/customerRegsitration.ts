import { Request, Response, Router } from 'express';
import EcCustomers from "../../models/ec_customers";

const customerRegistration = async(req: Request, res: Response) :Promise<void> => {
 
    try {
      const { full_name, e_mail, password, profile_pic } = req.body;
  
      const newCustomer = await EcCustomers.create({
        full_name,
        e_mail,
        password,
        profile_pic:Buffer.from(profile_pic),
      },{raw:true});


    // newCustomer.set(password);
    
      // Return the newly created user
      res.status(201).json({registration_id:newCustomer .registration_id});
    } catch (error:any) {
      console.error(error);
      res.status(500).json({ error: error.toString() });
    }

  
  };
  
  export { customerRegistration };
  