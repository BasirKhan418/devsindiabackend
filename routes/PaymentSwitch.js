import express from 'express';
const router = express.Router();
 import Switch from '../models/Switch.js';
router.get("/",async(req,res)=>{
   try{
    let data = await Switch.find({});
    res.status(200).json({message:"Data fetched successfully",data:data[0],success:true});
   }
   catch(err){
    res.status(500).json({error:"Some thing went wrong"+err.message,success:false});
   }
})
router.post("/",async(req,res)=>{
    try{
        let data = await Switch.create(req.body);
        res.status(200).json({message:"Data added successfully",data:data,success:true});
    }
    catch(err){
        res.status(500).json({error:"Some thing went wrong"+err.message,success:false});
    }
})
router.put("/",async(req,res)=>{
    try{
        let data = await Switch.findByIdAndUpdate({_id:req.body.id},{mode:req.body.mode});  
        
        res.status(200).json({message:"Data updated successfully",data:data,success:true});
    }
    catch(err){
        res.status(500).json({error:"Some thing went wrong"+err.message,success:false});
    }
})
router.delete("/:id",async(req,res)=>{
    try{
        let data = await Switch.findByIdAndDelete({_id:req.params.id});   
        res.status(200).json({message:"Data deleted successfully",data:data});
    }
    catch(err){
        res.status(500).json({error:"Some thing went wrong"+err.message});
    }
})
export default {router};