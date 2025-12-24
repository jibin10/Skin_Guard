const mongoose = require('mongoose');

const advancedSchema = mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  appointment_id: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: false },
  test_date: { type: String, required: true },
  details: { type: String, required: true },
  EfficientNetB7: { type: Number, required: true },
  VGG19: { type: Number, required: true },
  Inceptionv3: { type: Number, required: true },
  Xception: { type: Number, required: true },
  ResNet50: { type: Number, required: true },
  MobileNetV3: { type: Number, required: true },
  LabResult: {type: Number, required: false},
  imagePath: { type: String, required: true }
});

module.exports = mongoose.model('AdvancedTest', advancedSchema);
