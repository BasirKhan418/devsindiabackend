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
                name:req.body.name
           })
              await newAdmin.save();
                res.status(200).json({success:true,message:"Account created successfully"});
         }
        }
        catch(err){
            res.status(500).json({success:false,message:"SomeThing went wrong"+err.message});
        }
}
else if(req.body.status=="login"){
    try{
        let a = await Admin.findOne({email:req.body.email});
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
