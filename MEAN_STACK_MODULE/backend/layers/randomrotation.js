const tf = require('@tensorflow/tfjs');

module.exports = class RandomRotation extends tf.layers.Layer {
  static className = 'RandomRotation';

  constructor(config) {
    super(config);
  }
}
