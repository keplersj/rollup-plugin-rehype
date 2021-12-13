# rollup-plugin-rehype

[Rollup](https://rollupjs.org/) plugin for processing HTML files with [Rehype](https://github.com/rehypejs/rehype).

## Installation

Install in your project using npm:

```sh
npm i -D rollup-plugin-rehype
```

## Usage

Provide plugin, and any [Rehype Plugins](https://github.com/rehypejs/awesome-rehype#plugins), to Rollup:

```js
import rollupPluginRehype from "rollup-plugin-rehype";

export default {
  plugins: [
    // Options Object is optional
    rollupPluginRehype({
      // And Rehype Compatible Plugins Should Be in this Array
      plugins: [],
    }),
  ],
};
```

## License

Copyright 2021 [Kepler Sticka-Jones](https://keplersj.com). Licensed MIT.
