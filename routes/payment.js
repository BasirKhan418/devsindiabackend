import express from 'express';
import { handlePrePayment } from '../businessLogic/paymentFunc.js';
const router = express.Router();
 router.post('/',handlePrePayment);
 router.get('/',(req,res)=>{
     res.send('Payment Route');
 });
export default {router};