import InternUser from "../models/InternUser.js";
const handleGetPayemntData = async(req, res) => {
try{
 let a  = await InternUser.findOne({orderid:req.body.id});
 let b = await InternUser.populate(a,{path:"Regdomain"});
    res.status(200).json({success:true,data:b,message:"Payment data fetched successfully"});
}
catch(err){
    res.status(500).json({success:false,message:"SomeThing went wrong"+err.message});
}
}
export { handleGetPayemntData };