import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone:{
    type:Number,
    required:true
  },
  type:{
    type:String,
    required:true
  },
  token:{
    type:String,
  }
},{timestamps:true}); // collection
export default mongoose.model("Admin", adminSchema);