import Razorpay from "razorpay";
import * as crypto from "crypto"
import InternUser from "../models/InternUser.js";
import InternDetails from "../models/InternDetails.js";
import nodemailer from "nodemailer";
const handlePrePayment = async (req, res) => {
    try{
       
      let a = await InternUser.findOne({email:req.body.email,Regdomain:req.body.Regdomain,paymentstatus:"pending",teststatus:"pending"});
      let b = await InternUser.findOne({email:req.body.email,Regdomain:req.body.Regdomain,teststatus:"completed",paymentstatus:"pending"});
      let c = await InternUser.findOne({email:req.body.email,Regdomain:req.body.Regdomain,teststatus:"completed",paymentstatus:"Paid"});
        if(a!=null){
            // let order = {
            //     id:a.orderid,
            //     amount:a.amount*100
            // }
            let data = await InternUser.populate(a,{path:"Regdomain"});
            return res.status(200).json({success:false ,message:"Intern Already Registered. Please give the test to continue",data,status:"test"});
        }
        else if(b!=null){
            let order = {
                orderid:b.orderid,
                id:b._id,
            }
            return res.status(200).json({success:false,message:"You have already completed the test. Please make the payment to continue",data:order,status:"payment"});
        }
        else if(c!=null){
          return res.status(200).json({success:false,message:"You have already completed the test and made the payment. You have been Registered Successfully ",status:"registered"});
        }
   
    let internid = Math.floor(Math.random()*1000000)+"DIO";
    let indata = await InternDetails.findOne({_id:req.body.Regdomain});
      try{
        const data = new InternUser({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            desc:req.body.desc,
            profile:req.body.profile,
            Regdomain:req.body.Regdomain,
            status:"pending",
            internid:internid,
            amount:indata.price,
            paymentstatus:"pending",
            teststatus:"pending"
        });
        await data.save();
        let data1 = await InternUser.populate(data,{path:"Regdomain"});
        res.status(200).json({data:data1,success:true ,message:"Intern Registered successfully . Please make the payment to continue"});
       
      }
        
      
      catch(err){
      console.log(err);
      res.status(400).json({success:false});
      }
    }
    catch(err){
        console.log(err);
        res.status(500).json({success:false,message:"SomeThing went wrong"+err.message});
    }
}
//post payment starts here 
const handlePostPayment = async (req, res) => {
    const transporter = await nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.NEXT_PUBLIC_EMAIL_USER_NAME,
            pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
        }
      });
    const {razorpay_order_id, razorpay_payment_id,razorpay_signature} = req.body;
    console.log(req.body);
    // Pass yours key_secret here
    const key_secret = process.env.RAZORPAY_KEY_SECRET;     
  console.log(process.env.RAZORPAY_KEY_SECRET);
    // STEP 8: Verification & Send Response to User
      
    // Creating hmac object 
    let hmac = crypto.createHmac('sha256', key_secret); 
  
    // Passing the data to be hashed
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
      
    // Creating the hmac in the required format
    const generated_signature = hmac.digest('hex');
      console.log(razorpay_signature===generated_signature)
      
    if(razorpay_signature===generated_signature){
      // razorpay_order_id
  //     razorpay_payment_id: 'pay_LzpFe1jHO8rymk',
  // razorpay_order_id: 'order_LzpFVdVQVloXpf',
  // razorpay_signature:
 
     let a  = await InternUser.findOneAndUpdate({orderid:razorpay_order_id},{paymentid:razorpay_payment_id,paymentstatus:"Paid",status:"Registered"});
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
      <li><strong>Payment ID:</strong> ${razorpay_payment_id}</li>
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
  res.redirect(302, `${process.env.PUBLIC_HOST}/paymentconfirmation?id=${razorpay_order_id}`);
      }
    else{
        res.status(400).json({success:false});
    }
}
export { handlePrePayment ,handlePostPayment};
