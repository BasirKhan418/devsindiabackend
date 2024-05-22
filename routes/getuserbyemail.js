import InternUser from "../models/InternUser.js";
import express from 'express';
const router = express.Router();
router.get('/',async(req,res)=>{
    try{
let data = await InternUser.findOne({email:req.query.email,Regdomain:req.query.id});
if(data==null){
    return res.status(400).json({success:false,message:"No data found"});
}
return res.status(200).json({success:true,data:data,message:"Data found successfully"});

    }
    catch(err){
        
        return res.status(500).json({success:false,message:"SomeThing went wrong.Please try again later"});
    }
});
router.post('/',async(req,res)=>{
    try{
    let data = await InternUser.findByIdAndUpdate({_id:req.body.id},req.body);
    if(data==null){
        return res.status(400).json({success:false,message:"No data found"});
    }
    return res.status(200).json({success:true,data:data,message:"Data updated successfully"});  
}
    catch(err){
        return res.status(500).json({success:false,message:"SomeThing went wrong.Please try again later"});
    }
})
export default {router};