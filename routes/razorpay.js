import express from 'express';
const router = express.Router();
import Razorpay from 'razorpay';
import InternUser from '../models/InternUser.js';
import * as crypto from "crypto"
import nodemailer from "nodemailer";
router.get("/",(req,res)=>{
    res.send("Razorpay Route")
})
router.post("/pre",async(req,res)=>{
    
    let rand = Math.floor(Math.random() * 1000000000)+"DIO";
    var instance = new Razorpay({ key_id: `${process.env.RAZORPAY_KEY}`, key_secret: `${process.env.RAZORPAY_SECRET}` })
    
    var options = {
      amount: (req.body.amount)*100,  // amount in the smallest currency unit
      currency: "INR",
      receipt: `${rand}`
    };
    console.log(options);
    console.log(req.body);
    try{
    instance.orders.create(options, async function(err, order) {
      let dt = await InternUser.findByIdAndUpdate({_id:req.body.id},{orderid:order.id})
      res.json({order:order,success:true});
    })}
    catch(err){
        res.status(400).json({message:"Error in creating order",success:false});
        console.log(err);
    }
      
    
      
})
router.post("/post",async(req,res)=>{
    

  console.log(req.body);
  //validate payment using razorpay
    const {razorpay_order_id, razorpay_payment_id,razorpay_signature} = req.body;
    // Pass yours key_secret here
    const key_secret = process.env.RAZORPAY_SECRET;     
  
    // STEP 8: Verification & Send Response to User
      
    // Creating hmac object 
    let hmac = crypto.createHmac('sha256', key_secret); 
  
    // Passing the data to be hashed
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
      
    // Creating the hmac in the required format
    const generated_signature = hmac.digest('hex');
      
      
    if(razorpay_signature===generated_signature){
      // razorpay_order_id
  //     razorpay_payment_id: 'pay_LzpFe1jHO8rymk',
  // razorpay_order_id: 'order_LzpFVdVQVloXpf',
  // razorpay_signature:
 
    let dt = await InternUser.findOneAndUpdate({orderid:razorpay_order_id},{paymentid:razorpay_payment_id,paymentstatus:"Paid",status:"Registered"})
    try{
      const transporter = await nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.NEXT_PUBLIC_EMAIL_USER_NAME,
            pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
        }
      });
      // send mail with defined transport object
      let a  = await InternUser.findOne({_id:dt._id});
      let b = await InternUser.populate(a,{path:"Regdomain"});
 console.log(b.email);
  const info = await transporter.sendMail({
       from: '<Devsindia.account@org.in>', // sender address
       to: `${b.email}`, // list of receivers
       subject: `🎉 Confirmation: Successful Registration & Payment for Summer Internship Program 🚀`, // Subject line
       text: "DevsIndiaOrg", // plain text body
       html: `
       <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f7f7f7;">
 <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
   <div style="background-color: #007bff; border-top-left-radius: 10px; border-top-right-radius: 10px; padding: 20px;">
     <h1 style="margin: 0; color: #ffffff; font-weight: bold;">Internship Registration & Payment Confirmation</h1>
   </div>
   <div style="padding: 20px;">
     <p>Congratulations on successfully registering for the <strong>${b.Regdomain.title}</strong> Internship Program !</p>
     <p>Your order details:</p>
     <ul style="margin-bottom: 20px;">
       <li><strong>Name:</strong> ${b.name}</li>
       <li><strong>Order ID:</strong> ${b.orderid}</li>
       <li><strong>Payment ID:</strong> ${b.paymentid}</li>
       <li><strong>Program:</strong> ${b.Regdomain.title}</li>
       <li><strong>Duration:</strong> ${b.Regdomain.duration} Months</li>
       <li><strong>Payment:</strong>  ₹ ${b.amount}.00 INR</li>
     </ul>
     <p>Your payment has been processed successfully.</p>
     <p>We are thrilled to have you join us and look forward to your contributions. Please join the group as it is mandatory step to do.</p>
     <p>If you have any questions or need assistance, feel free to contact us at <a href="mailto:founder.devsindiaorg@gmail.com" style="color: #007bff; text-decoration: none;">founder.devsindiaorg@gmail.com</a>.</p>
     <p style="margin-bottom: 0;">Best regards,<br>Team DevsIndiaOrg</p>
   </div>
   <div style="text-align: center; background-color: #ADD8E6; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
     <a href=${b.Regdomain.grouplink} style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; transition: background-color 0.3s;">Join Group</a>
   </div>
 </div>
 </body>
       `, 
     });
    }
    catch(err){
      console.log(err);
    }
    return res.redirect(302, `${process.env.PUBLIC_HOST}/paymentconfirmation?id=${razorpay_order_id}`);
    
  }
 else{
  return res.redirect(302, `${process.env.PUBLIC_HOST}/payment/failed?id=${req.query.id}`);
  }
 
  
})
export default {router};