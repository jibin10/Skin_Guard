const { any, argMin } = require('@tensorflow/tfjs');
const mongoose = require('mongoose');

const recordSchema = mongoose.Schema({
  patient: { type: String, required: true },
  details: { type: String, required: true },
  skin_result: { type: Number, required: true },
  imagePath: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model('Record', recordSchema);
