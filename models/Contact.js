import mongoose from "mongoose";
const ContactSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    message:{type:String,required:true},
    status:{type:String},
    type:{type:String},
    replyMessage:{type:Array},
    ticketid:{type:String,required:true},
},{timestamps:true});
export default mongoose.model('Contact',ContactSchema);
