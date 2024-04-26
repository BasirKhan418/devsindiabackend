import nodemailer from 'nodemailer';
import Clients from '../models/Clients.js';
import fs from 'fs';
const handleClientData = async (req, res) => {
    console.log(req.body);
    console.log(req.files);
    try{
        const {name,email,phone,country,projecttype,whatsappno,companyname,budget,description,status,file} = req.body;
        const data = new Clients({
            name,
            email,
            phone,
            country,
            projecttype,
            whatsappno,
            companyname,
            budget,
            description,
            status,
            file
        });
        await data.save();
        res.status(200).json({success:true,message:"Client data saved successfully"});
    }
    catch(err){
        res.status(500).json({success:false,message:"SomeThing went wrong"+err.message});
    }
}
export {handleClientData};