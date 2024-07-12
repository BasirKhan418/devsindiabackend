import mongoose,{Schema} from "mongoose";
const NotificationSchema = new Schema({
    title: { type: String, required: true },
    crid: { type: Schema.Types.ObjectId, ref: 'InterDetails' ,required: true},
    token: {
        type: [String], // Ensure this is an array of objects
        default: [],
        required: true
      }
},{ timestamps: true })
export default mongoose.models.NotificationToken || mongoose.model("NotificationToken",NotificationSchema);