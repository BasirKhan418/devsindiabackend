import express from 'express';
import nodemailer from 'nodemailer';
import InternUser from '../models/InternUser.js';
const router = express.Router();
router.get('/', (req, res) => {
res.send('Get route from routes');
});
router.post('/', async(req, res) => {
try{
   console.log(req.body);
   let a  = await InternUser.findByIdAndUpdate({_id:req.body.id},{ccurl:req.body.url,status:"Completed"});
   let data = await InternUser.findOne({_id:req.body.id});
   const transporter = await nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
          user: process.env.NEXT_PUBLIC_EMAIL_USER_NAME,
          pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
      }
    });
   
    const info1 = await transporter.sendMail({
      from: '<Devsindia.account@org.in>', // sender address
      to: `${data.email}`, // list of receivers
      subject: `🎉 Congratulations on Completing Your Internship at DevsIndia! `, // Subject line
      text: "📜 Your Internship Completion Certificate is Here!", // plain text body
      html: `
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #e0e0e0; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #4A3AFF; padding: 20px; text-align: center;">
              <img src="https://res.cloudinary.com/dst73auvn/image/upload/v1716116459/Di_logo_bluebg_lc4snb.gif" alt="DevsIndia Logo" style="max-width: 150px; margin-bottom: 20px;">
          </div>
          <div style="padding: 20px; text-align: left;">
              <p style="font-size: 16px; color: #333333; margin: 0;">Dear <strong>${data.name}</strong>,</p>
              <p style="font-size: 16px; color: #333333; margin: 20px 0;">
                  We hope this message finds you well.
              </p>
              <p style="font-size: 16px; color: #333333; margin: 20px 0;">
                  We are pleased to inform you that your internship at DevsIndia has been successfully completed. It has been a pleasure having you as part of our team, and we greatly appreciate your contributions and dedication during your time with us.
              </p>
              <p style="font-size: 16px; color: #333333; margin: 20px 0;">
                  Attached, you will find your Internship Completion Certificate, which serves as a testament to the skills and experience you have gained with us. We believe that this accomplishment will significantly benefit your future endeavors.
              </p>
              <p style="font-size: 16px; color: #333333; margin: 20px 0;">
                  Once again, congratulations on your successful internship. We wish you all the best in your future career.
              </p>
              <p style="font-size: 16px; color: #333333; margin: 20px 0;">
                  Thank you and best regards,
              </p>
              <p style="font-size: 16px; color: #333333; margin: 0;">
                  <strong>SAKHSHI SINGH</strong><br>
                  HR Manager<br>
                  DevsIndia.in<br>
                  founder.devsindiaorg@gmail.com
              </p>
          </div>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center;">
              <p style="font-size: 12px; color: #777777; margin: 0;">&copy; 2024 DevsIndia.in All rights reserved.</p>
          </div>
      </div>
  </body>
      `, 
      attachments: [
          {
              filename: `${data.name}completioncc.pdf`, // change the filename as needed
              path: `${req.body.url}` // replace this with the path to your file
          }
      ]
    });


res.status(200).json({success:true,message:"Completion Certificate sent successfully"});

}
catch(err){
   res.status(400).json({success:false,message:"Error in sending the completion certificate"+err});
   console.log(err); 
}
})
export default {router};