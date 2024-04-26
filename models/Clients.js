import mongoose from "mongoose";
const ClientsSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    country:{type:String,required:true},
    projecttype:{type:String},
    whatsappno:{type:String},
    companyname:{type:String},
    budget:{type:String},
    description:{type:String},
    status:{type:String},
    file:{type:String},
},{timestamps:true});
export default mongoose.model('Clients',ClientsSchema);
