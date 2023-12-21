import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import EcSuppliers from '../../models/ec_suppliers';
import EcCustomers from '../../models/ec_customers';

const resetPassword = async (req: Request, res: Response): Promise<void | Response<any, Record<string, any>>> => {
    try {
        const { e_mail, newPassword } = req.body;
        const { client_type } = req.body.jwt_decoded;

        // Find the user by email
        let user;

        if(client_type==="supplier")
        user = await EcSuppliers.findOne({ where: { e_mail } });
        
        else if(client_type==="customer")
        user = await EcCustomers.findOne({ where: { e_mail } });

        if (!user) {
            return res.status(404).json({ error: `${client_type} not found` });
        }

        // Hash the new password
        const hashedPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));

        // Update the user's password
        await user.update({ password: hashedPassword });

        res.status(200).json({ message: 'Password reset successfull' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


export default resetPassword;
