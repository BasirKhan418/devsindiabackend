import mongoose, { Schema } from "mongoose";
const InternUserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    desc:{type:String,required:true},
    skills:{type:String},
    profile:{type:String},
    Regdomain:{type:Schema.Types.ObjectId,ref:'InternDetails'},
    status:{type:String},
    internid:{type:String},
    paymentid:{type:String},
    amount:{type:Number},
    orderid:{type:String},
    paymentstatus:{type:String},
    paymentid:{type:String},
    assignMentor:{type:String},
    project:{type:Array},
    assignMent:{type:Array}
},{timestamps:true});
export default mongoose.model('InternUser',InternUserSchema);
