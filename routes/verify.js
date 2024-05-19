import express from 'express';
const router = express.Router();
import InternUser from '../models/InternUser.js';
router.get('/', (req, res) => {
res.send('Get route from routes');
})
router.post('/', async(req, res) => {
try{
let a = await InternUser.findOne({internid:req.body.internid});
if(a){
if(a.ccurl!=""||a.ccurl){
res.status(200).send({message:"Certificate verified successfully !",success:true,data:a})
return;
}
res.status(400).send({message:"No certificate uploaded yet",success:false})
return;
}

else{
    res.status(400).send({message:"No such intern found",success:false})
    return;
}
}
catch(err){
    res.status(400).send({message:"Error in verifying the certificate. Please try again later.",success:false})
    return;
}
})
export default {router};