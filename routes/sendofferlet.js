import express from 'express';
import nodemailer from "nodemailer";
import InternUser from '../models/InternUser.js';
const router = express.Router();
router.get('/', (req, res) => {
res.send('Get route from routes');
})
router.post('/', async(req, res) => {
try{
    let user = await InternUser.findByIdAndUpdate({_id:req.body.id},{olurl:req.body.url,startdate:req.body.startdate,enddate:req.body.enddate});
    let a = await InternUser.findOne({_id:req.body.id});
    let data  = await InternUser.populate(a,{path:"Regdomain"});
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
        subject: `🎉 Congratulations! Your Exclusive Offer Letter Is Here – Act Now! 📝`, // Subject line
        text: "DevsIndiaOrg", // plain text body
        html: `
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
  <table style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); padding: 20px;" cellspacing="0" cellpadding="0" border="0" align="center">
    <tr>
      <td>
        <table width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td style="text-align: center; margin-bottom: 20px;">
              <img src="https://res.cloudinary.com/dst73auvn/image/upload/v1714112756/logogif_slfyto.gif" alt="DevsIndia Logo" style="width: 100px; height: auto; margin-bottom: 10px;">
              <h1 style="color: #333333;">Internship Offer Letter</h1>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f9f9f9; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
              <h2 style="margin-top: 0; color: #333333;">Dear ${data.name},</h2>
              <p style="color: #666666; margin-top: 5px; margin-bottom: 15px;">Congratulations! We are pleased to offer you the position of ${data.Regdomain.title} at DevsIndia. We believe that your skills and experience will make a valuable contribution to our team.</p>
              <p style="color: #666666; margin-top: 5px; margin-bottom: 15px;">This internship will begin on ${data.startdate} and end on ${data.enddate}. During this time, you will have the opportunity to work on exciting projects and learn from experienced professionals in the field.</p>
              <p style="color: #666666; margin-top: 5px; margin-bottom: 15px;">Please review the attached offer letter for more details on your compensation, responsibilities, and other important information.</p>
              <p style="color: #666666; margin-top: 5px; margin-bottom: 15px;">If you have any questions or concerns, feel free to contact us at hr@devsindia.in or support@devsindia.in .</p>
              <p style="color: #666666; margin-top: 5px; margin-bottom: 15px;">We look forward to welcoming you to the DevsIndia team!</p>
              <p style="color: #666666; margin-top: 5px; margin-bottom: 15px;">Best regards,<br> SAKHSHI SINGH<br> HR Manager <br> DevsIndia</p>
            </td>
          </tr>
          <tr>
            <td style="text-align: center; color: #666666;">
              <p>This email was sent to ${data.email}. If you believe you received this email in error, please contact us immediately.</p>
              <p>Attached: Offer Letter </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
        `, 
        attachments: [
            {
                filename: `${data.name}OfferLetter.pdf`, // change the filename as needed
                path: `${req.body.url}` // replace this with the path to your file
            }
        ]
      });
      res.status(200).json({success:true,message:"Offer Letter Sent Successfully"});

}
catch(err){
    res.status(400).json({success:false,message:"Error in sending offer letter. Try Again After Sometime . And also contact to the admin for your offer letter"});
}
})
export default {router};