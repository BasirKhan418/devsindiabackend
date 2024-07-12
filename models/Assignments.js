import mongoose from "mongoose";
const AssignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  type:{
    type:String,
    required:true
  },
  duedate:{
    type:String,
    required:true
  },
  crid:{
    type:String,
  }
},{timestamps:true}); // collection
export default mongoose.models.Assignments || mongoose.model("Assignments",AssignmentSchema);