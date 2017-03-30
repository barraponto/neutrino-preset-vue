# Neutrino Vue preset

[![Greenkeeper badge](https://badges.greenkeeper.io/barraponto/neutrino-preset-vue.svg)](https://greenkeeper.io/)
[![NPM version][npm-image]][npm-url] [![NPM downloads][npm-downloads]][npm-url]
[![Join Slack][slack-image]][slack-url]

`neutrino-preset-vue` is a Neutrino preset that adds basic support for
[Vue components][vuejs].

## Documentation

Install this preset to your development dependencies, then set it in
`package.json`. It should go after `neutrino-preset-web`, though it just needs
something to give it an entry point.

```json
  "neutrino": {
    "use": [
      "neutrino-preset-web",
      "neutrino-preset-vue"
    ]
  },
```

If you're using `neutrino-preset-lint` or any preset based on it,
this preset will add eslint plugin and rules for Vue components.

If you're using `neutrino-preset-stylelint` or any preset based on it,
this preset will add support for `<style>` tags in Vue components.

## Neutrino 4

Neutrino v4 is supported by the earlier release of this preset.
Please consider updating to Neutrino 5.

[vuejs]: https://vuejs.org/v2/guide/components.html
[npm-image]: https://img.shields.io/npm/v/neutrino-preset-vue.svg
[npm-downloads]: https://img.shields.io/npm/dt/neutrino-preset-vue.svg
[npm-url]: https://npmjs.org/package/neutrino-preset-vue
[slack-image]: https://neutrino-slack.herokuapp.com/badge.svg
[slack-url]: https://neutrino-slack.herokuapp.com/
