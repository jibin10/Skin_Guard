const tf = require('@tensorflow/tfjs');

module.exports = class Normalization extends tf.layers.Layer {
  static className = 'Normalization';

  constructor(config) {
    super(config);
  }
}
