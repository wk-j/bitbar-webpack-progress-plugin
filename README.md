## Bitbar Webpack Progress Plugin

Display webpack build progress in macOS Menu Bar.

![](https://github.com/wk-j/bitbar-webpack-progress-plugin/raw/master/screen/progress.png)

## Install Webpack Plugin

`npm install --save bitbar-webpack-progress-plugin`

## Install Bitbar Plugin

- https://github.com/wk-j/bitbar-plugins/blob/master/webpack-progress.1s.sh

## Usage

```javascript
var BitBarWebpackProgressPlugin = require("bitbar-webpack-progress-plugin");

module.exports = {
  entry: {
    main: "./app/main",
    renderer: "./app/renderer"
  },
  output: {
    filename: "[name].js",
    path: "./dist/js",
    libraryTarget: "commonjs2"
  },
  target: "node",
  node: {
    __dirname: false,
    __filename: false
  },
  devtool: "source-map",
  module: {
    preLoaders: [{
      loader: "source-map-loader",
      exclude: /node_modules/,
      test: /\.js$/
    }]
  },
  plugins: [
      new BitBarWebpackProgressPlugin()
  ]
};
```