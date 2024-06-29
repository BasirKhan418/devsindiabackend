import mongoose from "mongoose";
const CouponSchema = new mongoose.Schema({
title:{type:String,required:true},
cpncode:{type:String,required:true},
cpnstatus:{type:String,required:true},
cpnlimit:{type:String,required:true,default:"unlimited"},
cpnused:{type:String,default:"0"},
cpnTotalClaimed:{type:String,default:"0"},
cpnpercentage:{type:String,required:true},
cpnapplicable:{type:Array},
},{timestamps:true});
export default mongoose.model('Coupon',CouponSchema);