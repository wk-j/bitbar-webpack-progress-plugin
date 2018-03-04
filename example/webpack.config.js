const BitBarWebpackProgressPlugin = require("..");
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
