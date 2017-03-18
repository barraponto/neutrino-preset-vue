const VUE_LOADER = require.resolve('vue-loader');

module.exports = ({ config }) => {
  config.module
    .rule('vue')
    .test(/\.vue$/)
    .loader('vue', VUE_LOADER);
};
