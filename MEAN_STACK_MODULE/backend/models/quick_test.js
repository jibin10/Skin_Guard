const mongoose = require('mongoose');

const quickSchema = mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  appointment_id: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: false },
  test_date: { type: String, required: true },
  details: { type: String, required: true },
  test_result: { type: Number, required: true },
  imagePath: { type: String, required: true }
});

module.exports = mongoose.model('QuickTest', quickSchema);
