const arrify = require('arrify');
const merge = require('deepmerge');

module.exports = ({ config }, options) => {
  config.module.rule('vue')
    .test(/\.vue$/)
    .use('vue')
    .loader(require.resolve('vue-loader'))
    .options(options);

  if (config.module.rules.has('style') && config.module.rule('style').uses.has('postcss')) {
    const postcssLoaderOptions = config.module.rule('style').use('postcss').get('options');
    if (Object.getOwnPropertyNames(postcssLoaderOptions).length) { // check if object is not empty
      config.module
        .rule('vue')
        .use('vue')
        .tap(vueLoaderOptions => merge(vueLoaderOptions, {
          postcss: postcssLoaderOptions
        }));
    }
  }

  if (config.module.rules.has('lint')) {
    // ensure conditions is an array of original values plus our own regex
    const conditions = arrify(config.module.rule('lint').get('test')).concat([/\.vue$/]);
    config.module
      .rule('lint')
      .test(conditions)
      .use('eslint')
      .tap(options => merge(options, {
        plugins: ['vue'],
        env: { node: true },
        rules: {
          'vue/jsx-uses-vars': 2
        }
      }));
  }

  if (config.plugins.has('stylelint')) {
    const STYLELINT_HTML_PROCESSOR = require.resolve('stylelint-processor-html');
    config.plugin('stylelint')
      .tap(args => [
        merge(args[0], {
          files: ['**/*.vue'],
          config: {
            processors: [STYLELINT_HTML_PROCESSOR],
            rules: {
              // allows empty <style> in vue components
              'no-empty-source': null
            }
          }
        })
      ]);
  }
};
