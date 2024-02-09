import { log } from "console";
import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import EcSuppliers from "../../models/ec_suppliers";
import EcCustomers from "../../models/ec_customers";
import envConfig from "../../config/envConfig";

const login = async (
  req: Request,
  res: Response
): Promise<
  Response<
    any,
    Record<"message" | "token" | "client_type" | "registration_id", string>
  >
> => {
  const { e_mail, password, client_type } = req.body;

  try {
    // Find the user in the database
    let user;
    if (client_type === "supplier")
      user = await EcSuppliers.findOne({
        where: { e_mail },
        raw: true,
      });
    else if (client_type === "customer")
      user = await EcCustomers.findOne({
        where: { e_mail },
        raw: true,
      });

    // Check if the user exists and the password is correct
    if (user && bcrypt.compareSync(password, user.password)) {
      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, client_type },
        `${envConfig.jwt_secret_key}`, // Replace with your secret key
        { expiresIn: "24h" } // Token expiration time
      );

      return res.json({
        token,
        registration_id: user.registration_id,
        client_type,
      });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default login;
