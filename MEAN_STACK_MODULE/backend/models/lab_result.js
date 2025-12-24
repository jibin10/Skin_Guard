const mongoose = require('mongoose');

const labSchema = mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  appointment_id: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: false },
  test_date: { type: String, required: true },
  test_result: { type: Number, required: true }
});

module.exports = mongoose.model('LabTest', labSchema);
