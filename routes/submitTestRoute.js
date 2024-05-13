import express from 'express';
import InternUser from '../models/InternUser.js';
import Testq from '../models/Testq.js';
const router = express.Router();

router.get('/',(req,res)=>{
res.send("Hello World");
})
router.post('/',async (req,res)=>{
try{
let data = await InternUser.findByIdAndUpdate({_id:req.body.id},{teststatus:"completed",question1answer:req.body.question1Answer});
let testdata = await Testq.findOne({testid:req.body.testid});
console.log("hmm chal")
if(testdata==null){
    return res.status(200).json({success:false,message:"No such test found. Invalid test id. Please try again later."});
}
else if(data){
    // return res.status(200).json({success:true,message:"Test submitted successfully. Redirecting to the result page......"});
    console.log("code is running");
    let totalscore  =0;
      testdata.question1.map((item,index)=>{
        if(item.answer==req.body.question1Answer[index]){
          console.log("Correct Answer");
          totalscore++;
        }
        else{
          console.log("Wrong Answer");
        }
      });
      let totalq = testdata.question1.length;
      let percentage = (totalscore/totalq)*100;
      if(percentage>=60){
        let a = await InternUser.findByIdAndUpdate({_id:req.body.id},{teststatus:"completed",ispass:"pass",score:percentage});
      }
      else{
        let a = await InternUser.findByIdAndUpdate({_id:req.body.id},{teststatus:"completed",ispass:"fail",score:percentage});
      }
        return res.status(200).json({success:true,message:"Test submitted successfully. Redirecting to the result page......",});
}

else{
    return res.status(200).json({success:false,message:"No user found with this id"});
}
}
catch(err){
    res.status(400).json({success:false,message:err.message+" Try again later"});
}
})
export default {router};
