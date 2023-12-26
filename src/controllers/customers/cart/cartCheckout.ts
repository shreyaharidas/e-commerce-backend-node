import { Stripe } from 'stripe';
import { Request, Response } from 'express';
import EcBills from '../../../models/ec_bills';

const cartCheckout=async(req: Request, res: Response) :Promise<Response<any, Record<string, any>>|undefined>=>{

    const stripe = new Stripe('your-stripe-secret-key', {
        apiVersion: '2023-10-16',
      });

      try {
        const { products, token } = req.body;
    
        // Validate required fields
        if (!products || !Array.isArray(products) || products.length === 0 || !token) {
          return res.status(422).json({ error: 'Invalid request payload' });
        }
    
        // Calculate total amount from products (you should adjust this based on your product data)
        const totalAmount = products.reduce((total, product) => total + product.product_price * product.quantity, 0);
    
        // Create a payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
          amount: totalAmount,
          currency: 'inr',
          payment_method: token.id ||"tok_in",
          confirm: true,
        });
    
// Store checkout details in the MySQL database
const checkoutDetails = {
    invoice_number: paymentIntent.id,
    total_amount: totalAmount.toString(),
    products: JSON.stringify(products),
  };

  const ecBillEntry = await EcBills.create(checkoutDetails);

        // Handle successful payment
        return res.status(200).json({ success: true, paymentIntent });
      } catch (error) {
        console.error('Error processing payment:', error);
       return res.status(500).json({ error: 'Internal Server Error' });
      }
}

export {cartCheckout};