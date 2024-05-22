import express from 'express';
const router = express.Router();
router.get('/refund',async(req,res)=>{
    try{
        const response = await fetch(`https://api.cashfree.com/pg/orders/${req.query.orderid}/refunds`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'accept': 'application/json',
              'x-api-version': '2023-08-01',
              'x-client-id': `${process.env.CASHFREE_API_ID}`,
              'x-client-secret': `${process.env.CASHFREE_SECRET_KEY}`,
            },
          });
            const data = await response.json();
            console.log(data[0])
            if(data[0]==null){
                return res.status(400).json({success:false,message:"No data found"});
            }
            else{
                return res.status(200).json({success:true,data:data,message:"Refund Data found successfully"});
            }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"SomeThing went wrong.Please try again later"});
    }
})
router.get('/order',async(req,res)=>{
    try{
        const response = await fetch(`https://api.cashfree.com/pg/orders/${req.query.orderid}/payments`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'accept': 'application/json',
              'x-api-version': '2023-08-01',
              'x-client-id': `${process.env.CASHFREE_API_ID}`,
              'x-client-secret': `${process.env.CASHFREE_SECRET_KEY}`,
            },
          });
            const data = await response.json();
            if(data[0]==null){
                console.log(data);
                return res.status(400).json({success:false,message:"No data found"});
            }
            else{
                console.log(data);
                return res.status(200).json({success:true,data:data,message:"order Data found successfully"});
            }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"SomeThing went wrong.Please try again later"});
    }
})

export default {router};