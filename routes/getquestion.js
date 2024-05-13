import express from 'express';
import Testq from '../models/Testq.js';
const router = express.Router();
router.get('/',(req,res)=>{
res.send("Hello World");
})
router.post('/',async (req,res)=>{
    try{
 let data = await Testq.findOne({testid:req.body.testid});
    if(data){
        return res.status(200).json({success:true,data:data});
    }
    else{
        return res.status(200).json({success:false,message:"No such test found"});
    }
    }
    catch(err){
        res.status(400).json({success:false,message:err.message});
    }
})
export default {router};