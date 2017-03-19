const arrify = require('arrify');
const merge = require('deepmerge');
const VUE_LOADER = require.resolve('vue-loader');

module.exports = ({ config }) => {
  config.module
    .rule('vue')
    .test(/\.vue$/)
    .loader('vue', VUE_LOADER);

  if (config.module.rules.has('lint')) {
    // ensure conditions is an array of original values plus our own regex
    const conditions = arrify(config.module.rule('lint').get('test')).concat([/\.vue$/]);
    config.module
      .rule('lint')
      .test(conditions)
      .loader('eslint', props => merge(props, {
        options: {
          baseConfig: {
            plugins: ['vue'],
            env: { node: true },
            rules: {
              'vue/jsx-uses-vars': 2,
            },
          },
        },
      }));
  }

  if (config.plugins.has('stylelint')) {
    config.plugin('stylelint').inject((Plugin, options) => {
      return new Plugin(merge(options[0], {
        config: {
          processors: ['stylelint-processor-html'],
        },
      }));
    });
  }
};
