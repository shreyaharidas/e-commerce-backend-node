import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import envConfig from '../config/envConfig';

const verifyToken = (req: Request, res: Response, next: NextFunction): void|Response => {
  // Get the token from the request headers or query parameters
  let token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ error: 'Token not provided' });
  }

  token= token?.split("Bearer ")[1];

  // Verify the token
  jwt.verify(token as string, `${envConfig.jwt_secret_key}`, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Failed to authenticate token' });
    }

    // Attach the decoded payload to the request object for further use
    else req.body["jwt_decoded"] = decoded;
    next();
  });
};

export default verifyToken;
