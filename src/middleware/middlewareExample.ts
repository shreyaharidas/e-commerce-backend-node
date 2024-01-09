import {Request, Response, NextFunction} from 'express';

interface CustomRequest extends Request {
    customProperty?: string;
  }
export const firstExampleMW=(req:CustomRequest, res:Response, next:NextFunction)=>{

    console.log('Middleware - Modifying Request');
  
    // Modify the request, for example, add a custom property
    req["customProperty"] = 'This is a custom property added to the request';
    
    next(); // Continue to the next middleware or route handler

}

export const secondExampleMW=(req:CustomRequest, res:Response, next:NextFunction)=>{
    console.log('Middleware - Modifying Response');

  // Modify the response, for example, add a custom header
  res.setHeader('X-Custom-Header', 'This is a custom header added to the response');

  next(); // Continue to the next middleware or route handler
}