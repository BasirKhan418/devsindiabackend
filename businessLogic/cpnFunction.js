import Coupon from "../models/Coupon.js";
import InternUser from "../models/InternUser.js";
const GetData = async(req,res)=>{
try{
let data = await Coupon.find({});
res.status(200).json({data,success:true});
}
catch(err){
res.status(200).json({ success:false,message:"Something went wrong. Please try again later" + err.message});
}
}
const PostDataAndValidate = async(req,res)=>{
try{
if(req.body.status=="add"){
let coupon = new Coupon({
    title:req.body.title,
    cpncode:req.body.cpncode,
    cpnstatus:req.body.cpnstatus,
    cpnlimit:req.body.cpnlimit,
    cpnused:req.body.cpnused,
    cpnpercentage:req.body.cpnpercentage,
});
let data = await coupon.save();
res.status(200).json({data,success:true,message:"Coupon Added Successfully"});
} //end of add and if
//start of validate and else if
else if(req.body.status=="validate"){
    //check if coupon exists
let data = await Coupon.findOne({cpncode:req.body.cpncode});
//generate random number


//if coupon exists
if(data){
    //razorpay instance
   
    //end
    let cpnused = parseInt(data.cpnused);
    let cpnlimit = parseInt(data.cpnlimit);
    if(cpnused<cpnlimit || data.cpnlimit=="unlimited" && data.cpnstatus=="active"){
        cpnused = cpnused + 1;
        let cpnpercentage = parseInt(data.cpnpercentage);
        console.log(cpnpercentage);
        let totalMinus  = Math.floor((cpnpercentage/100*parseInt(req.body.amount)));
        console.log(totalMinus);
        let updatedTotal = parseInt(data.cpnTotalClaimed) + totalMinus;
        let total = parseInt(req.body.amount) - totalMinus;
        console.log(total);
        //creating a new order 
        data = await Coupon.findOneAndUpdate({cpncode:req.body.cpncode},{cpnused:cpnused,cpnTotalClaimed:updatedTotal});
        //payment provider order total - totalMinus
        let a = res.status(200).json({success:true,message:"Coupon Applied Successfully",discount:totalMinus,total});
        return;
    }
    else{
        res.status(200).json({data,success:false,message:"Coupon Limit Exceeded or Coupon is Inactive"});
    }
 res.status(200).json({data,success:false,message:"Coupon can not be Applied"});   

}
else{
    res.status(200).json({data,success:false,message:"Coupon Not Found"});
}
}
//end of validate and else if
}
catch(err){
res.status(200).json({ success:false,message:"Something went wrong. Please try again later" + err.message});
}
}
const UpdateData = async(req,res)=>{
try{
let data = await Coupon.findOneAndUpdate({_id:req.body.id},{
    title:req.body.title,
    cpncode:req.body.cpncode,
    cpnstatus:req.body.cpnstatus,
    cpnlimit:req.body.cpnlimit,
    cpnused:req.body.cpnused,
    cpnpercentage:req.body.cpnpercentage,
});
res.status(200).json({data,success:true,message:"Coupon Updated Successfully"});

}
catch(err){
res.status(200).json({ success:false,message:"Something went wrong. Please try again later" + err.message});

}
//catch block ended
}
const DeleteData = async(req,res)=>{
try{
let data = await Coupon.findOneAndDelete({_id:req.body.id});
res.status(200).json({data,success:true,message:"Coupon Deleted Successfully"});
}
catch(err){
res.status(200).json({ success:false,message:"Something went wrong. Please try again later" + err.message});


}

}
export {GetData,PostDataAndValidate,UpdateData,DeleteData};