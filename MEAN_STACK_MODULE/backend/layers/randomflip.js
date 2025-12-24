const tf = require('@tensorflow/tfjs');

module.exports = class RandomFlip extends tf.layers.Layer {
  static className = 'RandomFlip';

  constructor(config) {
    super(config);
  }
}
