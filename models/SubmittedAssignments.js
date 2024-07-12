import mongoose from "mongoose";
const { Schema } = mongoose;

const SubmittedSchema = new Schema({
  asid: { type: Schema.Types.ObjectId, ref: 'Assignments' },
  crid: { type: Schema.Types.ObjectId, ref: 'InternDetails' },
  userid: { type: Schema.Types.ObjectId, ref: 'InternUser' },
  response: {
    type: String,
  },
  status: {
    type: String,
    default: "submitted"
  },
  marks: {
    type: String,
    default: "0"
  },
}, { timestamps: true });

export default mongoose.models.SubmittedAssignments || mongoose.model("SubmittedAssignments", SubmittedSchema);
