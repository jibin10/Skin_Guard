const tf = require('@tensorflow/tfjs');

module.exports = class SlicingOpLambda extends tf.layers.Layer {
  static className = 'SlicingOpLambda';

  constructor(config) {
    super(config);
  }
}
