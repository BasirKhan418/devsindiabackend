import express from "express";
import multer from 'multer';
import path from 'path'; // Import the path module
import fs from 'fs'; // Import the File System module
const router = express.Router();
import Clients from "../models/Clients.js";
import nodemailer from 'nodemailer';

const uploadDir = './uploads';

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Use the correct path to the uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
router.get("/", async(req, res) => {
  try{
    const clients = await Clients.find();
    res.status(200).json({message:"Clients fetched successfully",clients,success:true});
  }
  catch(error){
    res.status(500).send("Error fetching clients" + error);
  }
});

router.post("/", upload.single('file'), async(req, res) => {
  const transporter = await nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER_NAME,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
    }
  });
  console.log(req.file);
  console.log(req.file);
  console.log(req.body);
  const { email, phone, country, projecttype, whatsappno, companyname, budget, description ,firstname,lastname} = req.body;
  const file = req.file.filename;
  const newClient = new Clients({
    name : req.body.firstname+" "+req.body.lastname,
    email,
    phone,
    country,
    projecttype,
    whatsappno,
    companyname,
    budget,
    description,
    file
  });
  try {
    await newClient.save();
    const info = await transporter.sendMail({
      from: '<support@Devsindia.org.in>', // sender address
      to: `${req.body.email}`, // list of receivers
      subject: `Confirmation - Your Request Has Been Received`, // Subject line
      text: "DevsIndiaOrg", // plain text body
      html: `
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
      <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 8px; border: 1px solid #ddd;">
          <div style="text-align: center; margin-bottom: 20px;">
              <img src="https://res.cloudinary.com/dst73auvn/image/upload/v1714112756/logogif_slfyto.gif" alt="Company Logo" style="max-width: 150px; height: auto;">
          </div>
          <div style="margin-bottom: 20px;">
              <h2 style="color: #333; margin-bottom: 10px;">Thank you for your application!</h2>
              <p style="color: #666; margin-bottom: 10px;">We have received your application and will review it as soon as possible. Please allow us some business days to process your request.</p>
              <p style="color: #666; margin-bottom: 10px;">If you have any urgent inquiries, feel free to contact us at <a href="mailto:enquiry@devsindia.in" style="color: #007bff; text-decoration: underline;">enquiry@devsindia.in</a>.</p>
          </div>
          <div style="text-align: center;">
              <a href=${process.env.PUBLIC_HOST} target="_blank" style="background-color: #007bff; color: #fff; text-decoration: none; display: inline-block; padding: 10px 20px; border-radius: 5px;">Visit Our Website</a>
          </div>
      </div>
  </body>
      `, 
    });
    const info2 = await transporter.sendMail({
      from: '<support@Devsindia.org.in>', // sender address
      to: `${process.env.EMAIL_LIST}`, // list of receivers
      subject: `New Client Request Notification - DevsIndiaOrg`, // Subject line
      text: "DevsIndiaOrg", // plain text body
      html: `
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 12px; border: 1px solid #dddddd;">
              <div style="text-align: center; margin-bottom: 20px;">
                  <h2 style="color: #333333; margin-bottom: 10px; font-size: 24px;">New Client Request</h2>
              </div>
              <div style="margin-bottom: 20px;">
                  <p style="color: #333333; margin-bottom: 10px; font-size: 16px;">Dear Admin,</p>
                  <p style="color: #333333; margin-bottom: 10px; font-size: 16px;">A new client has submitted a request. Below are the details:</p>
                  <ul style="color: #333333; margin-bottom: 10px; padding-left: 20px; font-size: 16px;">
                      <li>Name: ${firstname} +"" ${lastname} </li>
                      <li>Email: ${email} </li>
                      <li>Phone: ${phone} </li>
                      <li>WhatsApp No: ${whatsappno} </li>
                      <li>Company: ${companyname} </li>
                      <li>Country: ${country} </li>
                      <li>ProjectType: ${projecttype} </li>
                      <li>Budget: ${budget} </li>
                      <li>Description: ${description} </li>
                  </ul>
              </div>
              <div style="text-align: center;">
                  <p style="color: #333333; margin-bottom: 10px; font-size: 16px;">Please take necessary action to follow up with the client.</p>
                  <p style="color: #333333; margin-bottom: 10px; font-size: 16px;">Thank you.</p>
              </div>
          </div>
      </body>
      `,
      attachments: [
          {
              filename: 'AttachmentFile.pdf', // change the filename as needed
              path: `./uploads/${file}` // replace this with the path to your file
          }
      ]
  });
    res.status(301).redirect(`${process.env.PUBLIC_HOST}/confirmation`);
  } catch (error
    ) {
    res.status(500).send("Error adding client" + error);
  }
});

export default {router};
