import mongoose,{Schema} from "mongoose";
const AuthSchema = new Schema({
    email: { type: String, required: true },
    userid: { type: Schema.Types.ObjectId, ref: 'InternUser' },
    name:{type:String,required:true},
    token:{type:String,required:true},
},{ timestamps: true })
export default mongoose.models.Auth || mongoose.model("Auth",AuthSchema);