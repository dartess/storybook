const path = require('path');
const { default: babelJest } = require('babel-jest');

module.exports = babelJest.createTransformer({
  configFile: path.resolve(__dirname, '..', '.babelrc'),
});
