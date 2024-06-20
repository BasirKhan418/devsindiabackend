import mongoose from "mongoose";
const SwitchSchema = new mongoose.Schema({
mode:{type:String,required:true,default:"razorpay"},
},{timestamps:true});
export default mongoose.model('Switch',SwitchSchema);