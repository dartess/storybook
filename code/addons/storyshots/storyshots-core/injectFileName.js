const { createScriptTransformer } = require('@jest/transform');

const getNextTransformer = async (fileName, config) => {
  const self = config.transform.find(([pattern]) => new RegExp(pattern).test(fileName));
  return createScriptTransformer({
    ...config,
    transform: config.transform.filter((entry) => entry !== self),
  });
};

module.exports = {
  async process(src, fileName, { instrument, config }) {
    const transformer = await getNextTransformer(fileName, config);
    const { code } = await transformer.transformSourceAsync(fileName, src, instrument);

    return `${code};
if(exports.default != null) {
  exports.default.parameters = exports.default.parameters || {};
  exports.default.parameters.fileName = '${fileName.replace(/\\/g, '\\\\')}';
}
`;
  },
};
