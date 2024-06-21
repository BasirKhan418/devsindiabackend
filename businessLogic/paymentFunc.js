
import * as crypto from "crypto"
import InternUser from "../models/InternUser.js";
import InternDetails from "../models/InternDetails.js";
import nodemailer from "nodemailer";
import { Cashfree } from "cashfree-pg"; 


const handlePrePayment = async (req, res) => {
    try{
       
      let a = await InternUser.findOne({email:req.body.email,Regdomain:req.body.Regdomain,paymentstatus:"pending",teststatus:"pending"});
      let b = await InternUser.findOne({email:req.body.email,Regdomain:req.body.Regdomain,teststatus:"completed",paymentstatus:"pending"});
      let c = await InternUser.findOne({email:req.body.email,Regdomain:req.body.Regdomain,teststatus:"completed",paymentstatus:"Paid"});
        if(a!=null){
            // let order = {
            //     id:a.orderid,
            //     amount:a.amount*100
            // }
            let data = await InternUser.populate(a,{path:"Regdomain"});
            return res.status(200).json({success:false ,message:"Intern Already Registered. Please give the test to continue",data,status:"test"});
        }
        else if(b!=null){
            let order = {
                orderid:b.orderid,
                id:b._id,
            }
            return res.status(200).json({success:false,message:"You have already completed the test. Please make the payment to continue",data:order,status:"payment"});
        }
        else if(c!=null){
          return res.status(200).json({success:false,message:"You have already completed the test and made the payment. You have been Registered Successfully ",status:"registered"});
        }
   
    let internid = Math.floor(Math.random()*1000000)+"DIO";
    let indata = await InternDetails.findOne({_id:req.body.Regdomain});
      try{
        const data = new InternUser({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            desc:req.body.desc,
            profile:req.body.profile,
            Regdomain:req.body.Regdomain,
            status:"pending",
            internid:internid,
            amount:indata.price,
            paymentstatus:"pending",
            teststatus:"pending",
        });
        await data.save();
        let data1 = await InternUser.populate(data,{path:"Regdomain"});
        res.status(200).json({data:data1,success:true ,message:"Intern Registered successfully . Please make the payment to continue"});
       
      }
        
      
      catch(err){
      console.log(err);
      res.status(400).json({success:false});
      }
    }
    catch(err){
        console.log(err);
        res.status(500).json({success:false,message:"SomeThing went wrong"+err.message});
    }
}
//handlePayment
const handlePayment = async (req, res) => {
  Cashfree.XClientId = process.env.CASHFREE_API_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment = Cashfree.Environment.PRODUCTION;

  const orderid = Math.floor(Math.random()*1000)+req.body.id.toString()+"DIO";
  let a  = await InternUser.findOneAndUpdate({_id:req.body.id},{orderid:orderid});
  try{
    console.log(req.body);
    var request = {
      "order_amount": `${req.body.amount}.00`,
      "order_id": `${orderid}`,
      "order_currency": "INR",
      "customer_details": {
        "customer_id": `${req.body.id}`,
        "customer_name": `${req.body.name}`,
        "customer_email":  `${req.body.email}`,
        "customer_phone": `${req.body.phone}`
      },
      "order_meta": {
        "return_url": `${process.env.PUBLIC_HOST_OWN}/api/postpayment?order_id=${orderid}&id=${req.body.id}`,
      },
      "order_note": ""
    }
  
    Cashfree.PGCreateOrder("2023-08-01", request).then((response) => {
      var a = response.data;
      console.log(a)
      return res.status(200).json({success:true,data:a,message:"Order Created Successfully"});
    })
      .catch((error) => {
        console.error('Error setting up order request:', error.response.data);
      
        return res.status(400).json({success:false,message:"SomeThing went wrong. Please try again later"});
      });
  }
  catch(err){
    console.log(err);
    res.status(500).json({success:false,message:"SomeThing went wrong. Please try again later"});
  }
}
//post payment starts here 
const handlePostPayment = async (req, res) => {
  


   
      
//     if(true){
    
 
   
//   res.redirect(302, `${process.env.PUBLIC_HOST}/paymentconfirmation?id=${razorpay_order_id}`);
//       }
//     else{
//         res.status(400).json({success:false});
//     }
}
export { handlePrePayment ,handlePostPayment,handlePayment};
