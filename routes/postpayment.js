import express from 'express';
import { Cashfree } from "cashfree-pg"; 
import {handlePostPayment } from '../businessLogic/paymentFunc.js';
import InternUser from '../models/InternUser.js';
const router = express.Router();
import nodemailer from "nodemailer";
 router.post('/',handlePostPayment);
 router.get('/',async(req,res)=>{
    if(req.query.type=="check"){
        Cashfree.XClientId = process.env.CASHFREE_API_ID;
        Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
        Cashfree.XEnvironment = Cashfree.Environment.PRODUCTION;
        console.log(req.query.order_id);
        
        try {
            const response = await Cashfree.PGOrderFetchPayments("2023-08-01", req.query.order_id);
            var orderdata = response.data[0];
            if(response.data!=null){
            console.log(orderdata.payment_status);
            if(orderdata.payment_status=="SUCCESS"){
             let a  = await InternUser.findByIdAndUpdate({_id:req.query.id},{orderid:orderdata.order_id,paymentid:orderdata.payment_gateway_details.gateway_payment_id,amount:orderdata.order_amount,paymentstatus:"Paid",status:"Registered"});
             //try sending email
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
          let a  = await InternUser.findOne({_id:req.query.id});
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
         return res.status(200).json({success:true,message:"Payment Successfull"});
             }
             catch(err){
                console.log(err);
                return res.status(200).json({success:true,message:"Payment Successfull"});
             }
             
             return res.status(200).json({success:true,message:"Payment Successfull"});
            }
            else if(orderdata.payment_status!="SUCCESS"){
            return res.status(400).json({success:false,message:"Payment Failed"}); 
            }
            }
            return res.status(400).json({success:false,message:"Payment Failed"});
           
        } catch (error) {
            console.error('Error setting up order request:', error.response.data);
            return res.status(400).json({success:false,message:"Payment Failed"});
        }
    }
    else if(req.query.type!="check"||!req.query.type){
        Cashfree.XClientId = process.env.CASHFREE_API_ID;
        Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
        Cashfree.XEnvironment = Cashfree.Environment.PRODUCTION;
        console.log(req.query.order_id);
        
        try {
            const response = await Cashfree.PGOrderFetchPayments("2023-08-01", req.query.order_id);
            var orderdata = response.data[0];
            if(response.data!=null){
            
            console.log(orderdata.payment_status);
            if(orderdata.payment_status=="SUCCESS"){
             let a  = await InternUser.findByIdAndUpdate({_id:req.query.id},{orderid:orderdata.order_id,paymentid:orderdata.payment_gateway_details.gateway_payment_id,amount:orderdata.order_amount,paymentstatus:"Paid",status:"Registered"});
             //try sending email
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
          let a  = await InternUser.findOne({_id:req.query.id});
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
         return res.redirect(302, `${process.env.PUBLIC_HOST}/paymentconfirmation?id=${orderdata.order_id}`);
             }
             catch(err){
                console.log(err);
                return res.redirect(302, `${process.env.PUBLIC_HOST}/paymentconfirmation?id=${orderdata.order_id}`);
             }
             
             return res.redirect(302, `${process.env.PUBLIC_HOST}/paymentconfirmation?id=${orderdata.order_id}`);
            }

            else if(orderdata.payment_status!="SUCCESS"){
                return res.status(400).json({success:false,message:"Payment Failed"}); 
                }
        }
            return res.redirect(302, `${process.env.PUBLIC_HOST}/payment/failed?id=${req.query.id}`);
           
        } catch (error) {
            console.error('Error setting up order request:', error.response.data);
            return res.redirect(302, `${process.env.PUBLIC_HOST}/payment/failed?id=${req.query.id}`);
        }
    }
      
   
    

 });
export default {router};