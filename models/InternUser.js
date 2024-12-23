import mongoose, { Schema } from "mongoose";

const InternUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    desc: { type: String, required: true },
    skills: { type: String },
    profile: { type: String },
    Regdomain: { type: Schema.Types.ObjectId, ref: 'InternDetails' },
    status: { type: String },
    internid: { type: String },
    paymentid: { type: String },
    amount: { type: Number },
    orderid: { type: String },
    paymentstatus: { type: String, default: 'pending' },
    assignMentor: { type: String },
    project: { type: Array },
    assignMent: { type: Array },
    score: { type: Number, default: 0 },
    ispass: { type: String, default: 'pending' },
    olurl: { type: String },
    ccurl: { type: String },
    startdate: { type: String },
    enddate: { type: String },
    progress:{type:Number,default:0},
    crcmp: {
        type: [Object],
        default: []
      },//crcmp stands for course complete
    rank: { type: String },
    teststatus: { type: String, default: 'pending' },
    question1answer: [{ type: Object, default: '' }],
    question2answer: [{ type: Object, default: '' }],
    question3answer: [{ type: Object, default: '' }],
    question4answer: [{ type: Object, default: '' }],
}, { timestamps: true });

export default mongoose.models.InternUser || mongoose.model('InternUser', InternUserSchema);
