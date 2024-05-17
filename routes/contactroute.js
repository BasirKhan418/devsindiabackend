import express from 'express';
import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';
const router = express.Router();
router.get('/', (req, res) => {
    res.send('GET route on contact.');
});
router.post('/', async(req, res) => {
    let rand  ="#"+ Math.floor(Math.random()*100000)+"DIO";

    const transporter = await nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.NEXT_PUBLIC_EMAIL_USER_NAME,
            pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
        }
      });
    try{
        let data = new Contact({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            message:req.body.message,
            status:"pending",
            type:req.body.type,
            ticketid:rand
        });
        await data.save();
        const info1 = await transporter.sendMail({
            from: '<Devsindia.account@org.in>', // sender address
            to: `${process.env.EMAIL_LIST}`, // list of receivers
            subject: `New Query Received from ${req.body.name} - Ticket ID: ${rand}`, // Subject line
            text: "DevsIndiaOrg", // plain text body
            html: `
            <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
              <div style="text-align: center; padding: 10px 0;">
                <img src="https://res.cloudinary.com/dst73auvn/image/upload/v1714112756/logogif_slfyto.gif" alt="Company Logo" style="width: 100px;">
              </div>
              <div style="padding: 20px; color: #333333;">
                <h2 style="color: #333333;">New Query Received</h2>
                <p>A new query has been submitted with the following details:</p>
                <div style="margin: 20px 0;">
                  <p style="margin: 5px 0;"><strong>Name:</strong> ${req.body.name}</p>
                  <p style="margin: 5px 0;"><strong>Email:</strong> ${req.body.email}</p>
                  <p style="margin: 5px 0;"><strong>Issue Type:</strong> ${req.body.type}</p>
                  <p style="margin: 5px 0;"><strong>Message:</strong> ${req.body.message}</p>
                </div>
                <a href="mailto:${req.body.email}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px;">Respond to User</a>
              </div>
              <div style="text-align: center; padding: 10px; color: #777777; font-size: 12px;">
                &copy; 2024 Devsindia.in. All rights reserved.
              </div>
            </div>
          </body>
            `, 
          });

          const info2 = await transporter.sendMail({
            from: '<Devsindia.account@org.in>', // sender address
            to: `${req.body.email}`, // list of receivers
            subject: ` Thank You for Your Query - Ticket ID: ${rand}`, // Subject line
            text: "DevsIndiaOrg", // plain text body
            html: `
            <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
              <div style="text-align: center; padding: 10px 0;">
                <img src="https://res.cloudinary.com/dst73auvn/image/upload/v1714112756/logogif_slfyto.gif" alt="Company Logo" style="width: 100px;">
              </div>
              <div style="padding: 20px; color: #333333;">
                <h2 style="color: #333333;">Thank You for Your Query</h2>
                <p>Dear ${req.body.name},</p>
                <p>Thank you for reaching out to us. Your query has been received and we will get back to you as soon as possible. Your ticket ID is <strong>${rand}</strong>.</p>
                <p>Please allow us to give 3 to 5 business days . We will resolve your issue as soon as possible.</p>
                <a href="https://devsindia.in" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px;">Visit our Website</a>
              </div>
              <div style="text-align: center; padding: 10px; color: #777777; font-size: 12px;">
                &copy; 2024 Devsindia.in. All rights reserved.
              </div>
            </div>
          </body>
            `, 
          });
          res.status(200).json({success:true,message:"Query Submitted Successfully",ticketid:rand});
    }
    catch(err){
        res.status(500).json({success:false,message:"SomeThing went wrong"+err.message});
    }
});
export default {router};