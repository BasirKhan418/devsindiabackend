import mongoose,{Schema} from "mongoose";
const OtpSchema = new Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
},{ timestamps: true })
export default mongoose.models.Otp || mongoose.model("Otp",OtpSchema);