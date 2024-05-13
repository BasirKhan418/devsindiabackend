import express from 'express';
const router = express.Router();
import nodemailer from "nodemailer";
router.get('/',(req,res)=>{
res.send("Hello World");
})
router.post('/',async (req,res)=>{
    console.log(req.body);
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
        let URL = `${process.env.PUBLIC_HOST}/test/getstarted?testid=${req.body.testid}&id=${req.body.id}&rtk=true`
        const info = await transporter.sendMail({
            from: '<Devsindia.account@org.in>', // sender address
            to: `${req.body.email}`, // list of receivers
            subject: `Your Second Chance Awaits: Test Retake Scheduled for ${req.body.testname} `, // Subject line
            text: "DevsIndiaOrg", // plain text body
            html: `
            <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f2f2f2;">
            <table style="max-width: 600px; margin: 0 auto; padding: 20px; border-collapse: collapse; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); background-color: #ffffff;">
                <tr>
                    <td colspan="2" style="background-color: #007bff; border-radius: 10px 10px 0 0; padding: 10px 20px;">
                        <h1 style="color: #fff; margin: 0;">Test Retake Scheduled</h1>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="padding: 20px;">
                        <p style="color: #333; margin: 0;">Hello ${req.body.name},</p>
                        <p style="color: #333; margin: 10px 0;">We have scheduled a retake for ${req.body.testname} test. Please make sure to prepare accordingly.</p>
                        <p style="color: #333; margin: 10px 0;">To take the test, click the button below:</p>
                        <a href=${URL}  style="display: inline-block; font-size: 16px; color: #fff; background-color: #007bff; border: none; padding: 10px 20px; text-decoration: none; border-radius: 5px; cursor: pointer;">Take Test</a>
                        <p style="color: #333; margin: 10px 0;">If you have any questions or concerns, feel free to contact us.</p>
                        <p style="margin-bottom: 0; color: #333;">Best regards,<br> Team DevsIndia.org</p>
                    </td>
                </tr>
            </table>
        </body>
            `, 
          });
          res.status(200).json({success:true,message:"Email sent successfully",url:URL});
          console.log(req.body);
    }
    catch(err){
        res.status(400).json({success:false,message:err.message});
    }
})
export default {router};