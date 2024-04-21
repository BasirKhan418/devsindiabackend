import express from 'express';
import {handlePostPayment } from '../businessLogic/paymentFunc.js';
const router = express.Router();
 router.post('/',handlePostPayment);
 router.get('/',(req,res)=>{
     res.send('Payment Route');
 });
export default {router};