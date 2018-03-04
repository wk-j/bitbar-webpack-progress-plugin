## Bitbar Webpack Progress Plugin

Display webpack build progress in macOS Menu Bar.

![](https://github.com/wk-j/bitbar-webpack-progress-plugin/raw/master/screen/progress.png)

## Install Webpack Plugin

`npm install --save-dev bitbar-webpack-progress-plugin`

## Install Bitbar Plugin

- https://github.com/wk-j/bitbar-plugins/blob/master/webpack-progress.1s.sh

## Usage

```javascript
const BitBarWebpackProgressPlugin = require("bitbar-webpack-progress-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./app/main"
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist", "js")
  },
  devtool: "source-map",
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  plugins: [new BitBarWebpackProgressPlugin()]
};
```