const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  booking_date: { type: String, required: true },
  appointment_date: { type: String, required: true },
  appointment_time: { type: String, required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  condition: { type: String, required: false },
  status: { type: String, required: true }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
