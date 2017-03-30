const arrify = require('arrify');
const merge = require('deepmerge');
const path = require('path');

module.exports = ({ config }, options) => {
  const NODE_MODULES = path.join(__dirname, 'node_modules');
  const LOADER_EXTENSIONS = /\.vue$/;
  const styleRule = config.module.rules.get('style');
  const stylePostCssLoader = styleRule && styleRule.uses.get('postcss');
  const lintRule = config.module.rules.get('lint');

  config.module.rule('vue')
    .test(LOADER_EXTENSIONS)
    .use('vue')
      .loader(require.resolve('vue-loader'))
      .options(options);

  config.resolve.extensions.add('.vue');
  config.resolveLoader.modules.add(NODE_MODULES);

  if (stylePostCssLoader) {
    const postcssLoaderOptions = stylePostCssLoader.get('options');

    if (Object.getOwnPropertyNames(postcssLoaderOptions).length) { // check if object is not empty
      config.module
        .rule('vue')
        .use('vue')
        .tap(vueLoaderOptions => merge(vueLoaderOptions, {
          postcss: postcssLoaderOptions
        }));
    }
  }

  if (lintRule) {
    // ensure conditions is an array of original values plus our own regex
    const conditions = arrify(lintRule.get('test')).concat([LOADER_EXTENSIONS]);

    config.module
      .rule('lint')
      .test(conditions)
      .use('eslint')
        .tap(options => merge(options, {
          baseConfig: {
            plugins: ['vue'],
            env: { node: true },
            rules: {
              'vue/jsx-uses-vars': 2
            }
          }
        }));
  }

  if (config.plugins.has('stylelint')) {
    config.plugin('stylelint')
      .tap(args => [
        merge(args[0], {
          files: ['**/*.vue'],
          config: {
            processors: [require.resolve('stylelint-processor-html')],
            rules: {
              // allows empty <style> in vue components
              'no-empty-source': null
            }
          }
        })
      ]);
  }
};
