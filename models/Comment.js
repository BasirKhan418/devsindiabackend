const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  comment: {
    type: [Object], 
    default: []
  }
  
}, { timestamps: true });

module.exports = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
