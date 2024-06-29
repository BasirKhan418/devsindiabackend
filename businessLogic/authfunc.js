import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto-js';
import nodemailer from 'nodemailer';
const handleAuth = async (req, res) => {
    const transporter = await nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.NEXT_PUBLIC_EMAIL_USER_NAME,
            pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
        }
      });
      
    if(req.body.status=="register"){
        try{
         let a = await Admin.findOne({email:req.body.email});
         if(a!=null){
                res.status(400).json({success:false,message:"Account already exists"});
         }
         else{
           let newAdmin = new Admin({
               email:req.body.email,
               password:crypto.AES.encrypt(req.body.password,process.env.AES_SECRET).toString(),
               phone:req.body.phone,
                name:req.body.name,
                type:req.body.type
           })
              await newAdmin.save();
              if(req.body.type=="admin"){
                const info = await transporter.sendMail({
                    from: '<account@devsindia.in>', // sender address
                    to: `${req.body.email}`, // list of receivers
                    subject: `🎉 Admin Access Granted! Welcome Aboard!`, // Subject line
                    text: "DevsIndiaOrg", // plain text body
                    html: `
                    <body style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0;">
    <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border-radius: 8px;">
        <div style="text-align: center; background-color: #007bff; color: #fff; padding: 10px 0; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">Admin Access Granted</h1>
        </div>
        <div style="padding: 20px;">
            <p style="margin: 15px 0;">Dear ${req.body.name},</p>
            <p style="margin: 15px 0;">We are pleased to inform you that your request for admin access has been granted. You can now access both the Admin and LMS Admin panels.</p>
            <p style="margin: 15px 0;"><strong>Email:</strong> ${req.body.email}</p>
            <p style="margin: 15px 0;"><strong>Password:</strong> ${req.body.password}</p>
            <p style="margin: 15px 0;">For your security, please change your password after logging in.</p>
            <a href="https://devsindia.in/adminlogin" style="display: inline-block; padding: 10px 20px; margin: 20px 0; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Login Now</a>
            <p style="margin: 15px 0;">If you have any questions or need further assistance, please contact our support team.</p>
            <p style="margin: 15px 0;">Best regards,<br>The Team</p>
        </div>
        <div style="text-align: center; padding: 10px; font-size: 12px; color: #777;">
            <p style="margin: 0;">&copy; 2024 Devsindia.in. All rights reserved.</p>
        </div>
    </div>
</body>
                    `, 
                  });
              }
              else{
                const info = await transporter.sendMail({
                    from: '<account@devsindia.in>', // sender address
                    to: `${req.body.email}`, // list of receivers
                    subject: `🎉 Devsindia LMS Admin Access Granted! Get Started Now!`, // Subject line
                    text: "DevsIndiaOrg", // plain text body
                    html: `
                    <body style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0;">
    <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); border-radius: 8px;">
        <div style="text-align: center; background-color: #28a745; color: #fff; padding: 10px 0; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">LMS Admin Access Granted</h1>
        </div>
        <div style="padding: 20px;">
            <p style="margin: 15px 0;">Dear ${req.body.name},</p>
            <p style="margin: 15px 0;">We are excited to inform you that your request for LMS admin access has been granted. You can now manage the Learning Management System as an admin.</p>
            <p style="margin: 15px 0;"><strong>Email:</strong> ${req.body.email}</p>
            <p style="margin: 15px 0;"><strong>Password:</strong> ${req.body.password}</p>
            <p style="margin: 15px 0;">For your security, please change your password after logging in.</p>
            <a href="https://lms.devsindia.in/adminlogin" style="display: inline-block; padding: 10px 20px; margin: 20px 0; background-color: #28a745; color: #fff; text-decoration: none; border-radius: 5px;">Login Now</a>
            <p style="margin: 15px 0;">If you have any questions or need further assistance, please contact our support team.</p>
            <p style="margin: 15px 0;">Best regards,<br>The Team</p>
        </div>
        <div style="text-align: center; padding: 10px; font-size: 12px; color: #777;">
            <p style="margin: 0;">&copy; 2024 DevsIndia.in. All rights reserved.</p>
        </div>
    </div>
</body>
                    `, 
                  });
              }
                res.status(200).json({success:true,message:"Account created successfully"});
         }
        }
        catch(err){
            res.status(500).json({success:false,message:"SomeThing went wrong"+err.message});
        }
}
else if(req.body.status=="login"){
    try{
        let a = await Admin.findOne({email:req.body.email,type:"admin"});
        
        if(a==null){
            res.status(400).json({success:false,message:"Account does not exist"});
        }
        else{
            //decrypt the password
           const decryptpass = crypto.AES.decrypt(a.password,process.env.AES_SECRET).toString(crypto.enc.Utf8);
           if(decryptpass==req.body.password){
            const token = jwt.sign({email:a.email},process.env.JWT_SECRET);
            res.status(200).json({success:true,message:"Login successful",token:token});
           }
           //if password is wrong
           else{
            res.status(400).json({success:false,message:"Invalid Password"});
           }
        }
    }
    catch(err){
        res.status(500).json({success:false,message:"SomeThing went wrong"+err.message});
    }
}
else{
    res.status(400).json({success:false,message:"Invalid Request"});
}
}
const GetAllAdmins = async (req, res) => {
    try{
        let data = await Admin.find();
        res.status(200).json({success:true,data:data,message:"All Admins fetched successfully"});
    }
    catch(err){
        res.status(500).json({success:false,message:"SomeThing went wrong"+err.message});
    }
}   
const DeleteOneAdmin = async (req, res) => {
    try{
        const id = req.params.id;
        await Admin.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Admin deleted successfully"});
    }
    catch(err){
        res.status(500).json({success:false,message:"SomeThing went wrong"+err.message});
    }
}
export { handleAuth , GetAllAdmins , DeleteOneAdmin};
