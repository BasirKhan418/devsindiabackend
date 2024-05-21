import express from 'express';
import { handlePayment } from '../businessLogic/paymentFunc.js';
const router = express.Router();
router.get('/',(req,res)=>{
    res.send('Cashfree Payment Route');

})
router.post('/',handlePayment);

export default {router};