import { Request, Response } from 'express';
import EcCustomers from '../../models/ec_customers';

const customerProfile = async (req: Request, res: Response): Promise<void | Response<any, Record<string, any>>> => {
  try {
    // Assume you have a middleware to decode the user information from the token and attach it to req.decoded
    const { userId} = req.body.jwt_decoded;

    // Fetch supplier profile details from the database
    const customer = await EcCustomers.findByPk(userId, {
      attributes: ['full_name', 'e_mail', 'registration_id', 'registration_time_stamp'],
    });

    if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
     
    }

    // Return supplier profile details
    res.status(200).json({
      full_name: customer.full_name,
      e_mail: customer.e_mail,
      registration_id: customer.registration_id,
      registration_time_stamp: customer.registration_time_stamp,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { customerProfile };
