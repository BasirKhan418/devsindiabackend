const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideosSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  folderid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  content: {
    type: [Object], // Ensure this is an array of objects
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.models.Videos || mongoose.model('Videos', VideosSchema);
