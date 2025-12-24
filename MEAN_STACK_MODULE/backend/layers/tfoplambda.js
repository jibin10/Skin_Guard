const tf = require('@tensorflow/tfjs');

module.exports = class TFOpLambda extends tf.layers.Layer {
  static className = 'TFOpLambda';

  constructor(config) {
    super(config);
  }
}
