var BitBarWebpackProgressPlugin = require("../index");

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