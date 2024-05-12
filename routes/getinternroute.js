import express from 'express';
import InternUser from '../models/InternUser.js';
const router = express.Router();
router.get('/',(req,res)=>{
    res.send("Intern Details Protected route");
})
router.post('/',async(req,res)=>{
try{
    console.log(req.body);
let data = await InternUser.findOne({_id:req.body.id});
let data1 = await InternUser.populate(data,{path:"Regdomain"});
if(data){
    res.status(200).json({success:true,data:data1,message:"Intern Details Found"});
}
else{
    res.status(400).json({success:false,message:"Intern Details Not Found"});
}
}
catch(err){
    res.status(400).json({success:false,message:"Error in getting Intern Details.Try Again After Sometime"});
}
})
export default {router};