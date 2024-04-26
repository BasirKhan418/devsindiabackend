import InternUser from "../models/InternUser.js";
import InternDetails from "../models/InternDetails.js";
const AllInternData = async(req, res) => {
    try{
let data = await InternUser.find({});
let data1 = await InternDetails.populate(data,{path:"Regdomain"});
console.log(data1);
res.status(200).json({success:true,data:data1});
    }
    catch(err){
        res.status(500).json({success:false,message:"SomeThing went wrong"+err.message});
    }

}
const SearchInternData = async(req, res) => {
    try{
if(req.body.status=="" && req.body.id!=""){
let data = await InternUser.find({Regdomain:req.body.id});
let data1 = await InternDetails.populate(data,{path:"Regdomain"});
res.status(200).json({success:true,data:data1,message:"Intern data fetched successfully"});
}
else if(req.body.status!="" && req.body.id==""){
let data = await InternUser.find({status:req.body.status});
let data1 = await InternDetails.populate(data,{path:"Regdomain"});
res.status(200).json({success:true,data:data1,message:"Intern data fetched successfully"});
    }
    else if(req.body.status!="" && req.body.id!=""){
        let data = await InternUser.find({status:req.body.status,Regdomain:req.body.id});
        let data1 = await InternDetails.populate(data,{path:"Regdomain"});
        res.status(200).json({success:true,data:data,message:"Intern data fetched successfully"});
    }
}
    catch{
     res.status(500).json({success:false,message:"SomeThing went wrong"+err.message});
    }
}
export {AllInternData,SearchInternData};