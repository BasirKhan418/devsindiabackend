import Razorpay from "razorpay";
import * as crypto from "crypto"
import InternUser from "../models/InternUser.js";
import InternDetails from "../models/InternDetails.js";
const handlePrePayment = async (req, res) => {
    try{
        let a = await InternUser.findOne({email:req.body.email,Regdomain:req.body.Regdomain,paymentstatus:"Pending"});
        let b = await InternUser.findOne({email:req.body.email,Regdomain:req.body.Regdomain,paymentstatus:"Paid"});
        if(a!=null){
            let order = {
                id:a.orderid,
                amount:a.amount*100
            }
            return res.status(200).json({order,success:true ,message:"Intern Registered successfully . Please make the payment to continue"});
        }
        else if(b!=null){
            return res.status(200).json({success:false,message:"You have already registered for this Internship"});
        }
    let rand=Math.floor(Math.random()*10000000);
    let internid = Math.floor(Math.random()*1000000)+"DIO";
    var instance = new Razorpay({ key_id: `${process.env.RAZORPAY_KEY_ID}`, key_secret: `${process.env.RAZORPAY_KEY_SECRET}` })
    console.log(req.body);
    let indata = await InternDetails.findOne({_id:req.body.Regdomain});
    console.log(indata);
    var options = {
        amount: (indata.price)*100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: `${rand}`
      };
      try{
      instance.orders.create(options, async function(err, order) {
        console.log(order);
        const data = new InternUser({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            desc:req.body.desc,
            profile:req.body.profile,
            Regdomain:req.body.Regdomain,
            status:"Pending",
            internid:internid,
            amount:indata.price,
            orderid:order.id,
            paymentstatus:"Pending",
        });
        await data.save();
        res.status(200).json({order,success:true ,message:"Intern Registered successfully . Please make the payment to continue"});
       
      })}
        
      
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
const handlePostPayment = async (req, res) => {
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

  res.redirect(302, `${process.env.PUBLIC_HOST}/Internform?id=${razorpay_order_id}`);
      }
    else{
        res.status(400).json({success:false});
    }
}
export { handlePrePayment ,handlePostPayment};
