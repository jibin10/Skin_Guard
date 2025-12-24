const mongoose = require('mongoose');

const performanceSchema = mongoose.Schema({
  EfficientNetB7_TP: { type: Number, required: true },
  EfficientNetB7_TN: { type: Number, required: true },
  EfficientNetB7_FP: { type: Number, required: true },
  EfficientNetB7_FN: { type: Number, required: true },
  VGG19: { type: Number, required: true },
  Inceptionv3: { type: Number, required: true },
  Xception: { type: Number, required: true },
  ResNet50: { type: Number, required: true },
  MobileNetV3: { type: Number, required: true },
});

module.exports = mongoose.model('Performance', performanceSchema);
