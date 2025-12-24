const mongoose = require('mongoose');

const prescriptionSchema = mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  appointment_id: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: false },
  prescription: { type: String, required: true },
  tests: { type: String, required: false }
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
