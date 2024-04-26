import InternDetails from "../models/InternDetails.js";
const handleAllInternshipDetails = async (req, res) => {
    console.log('Inside handleAllInternshipDetails');
    try{
        
     const {title,desc,img,price,skills,seats,duration,grouplink} = req.body;
     const data = new InternDetails({
            title,
            desc,
            img,
            price,
            skills,
            seats,
            duration,
            grouplink
        });
        await data.save();
        res.status(200).json({success:true,message:"Internship details saved successfully"});
    }
    catch(err){
        res.status(500).json({success:false,message:"SomeThing went wrong"+err.message});
    }
}
const FetchAllInternshipDetails = async (req, res) => {
  try{
 let data = await InternDetails.find();
 res.status(200).json({success:true,data:data});
  }
  catch(err){
        res.status(500).json({success:false,message:"SomeThing went wrong"+err.message});
    
  }
}
const DeleteOneInternShip= async (req, res) => {
    try{
        const id = req.params.id;
        await InternDetails.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Internship details deleted successfully"});
    }
    catch(err){
        res.status(500).json({success:false,message:"SomeThing went wrong"+err.message});
    }
}
const UpdateInternShip = async (req, res) => {
const id = req.params.id;
try{
let a = await InternDetails.findByIdAndUpdate({_id:id},req.body);
res.status(200).json({success:true,message:"Internship details updated successfully"});

}
catch(err){
    res.status(500).json({success:false,message:"SomeThing went wrong"+err.message});

}
}

export { handleAllInternshipDetails, FetchAllInternshipDetails ,DeleteOneInternShip,UpdateInternShip};