import { Request, Response } from 'express';
import EcSuppliers from '../../models/ec_suppliers';

const supplierProfile = async (req: Request, res: Response): Promise<void | Response<any, Record<string, any>>> => {
  try {
    // Assume you have a middleware to decode the user information from the token and attach it to req.decoded
    const { userId} = req.body.jwt_decoded;

    // Fetch supplier profile details from the database
    const supplier = await EcSuppliers.findByPk(userId, {
      attributes: ['full_name', 'e_mail', 'registration_id', 'registration_time_stamp'],
    });

    if (!supplier) {
        return res.status(404).json({ error: 'Supplier not found' });
     
    }

    // Return supplier profile details
    res.status(200).json({
      full_name: supplier.full_name,
      e_mail: supplier.e_mail,
      registration_id: supplier.registration_id,
      registration_time_stamp: supplier.registration_time_stamp,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { supplierProfile };
