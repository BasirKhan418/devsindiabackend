import mongoose from "mongoose";

const InternSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    skills: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    grouplink: { type: String, required: true },
    seats: { type: Number, required: true },
    duration: { type: String, required: true },
    testid: { type: String, required: true },
    isopen: { type: Boolean },
    discount: { type: Number },
    feature: { type: String },
    ytvideo: { type: String },
    startdate: { type: String },
}, { timestamps: true });

export default mongoose.models.InternDetails || mongoose.model('InternDetails', InternSchema);
