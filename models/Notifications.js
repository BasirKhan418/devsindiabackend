import mongoose,{Schema} from "mongoose";
const NotificationsSchema = new Schema({
    title: { type: String, required: true },
    nid: { type: Schema.Types.ObjectId, ref: 'NotificationToken' },
    desc: { type: String, required: true },
    link:{ type: String, required: true },
},{ timestamps: true })
export default mongoose.models.Notifications || mongoose.model("Notifications",NotificationsSchema);