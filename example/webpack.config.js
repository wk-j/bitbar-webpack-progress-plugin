const BitBarWebpackProgressPlugin = require("..");
const path = require("path");
module.exports = {
  mode: "development",
  entry: {
    main: "./app/main",
    renderer: "./app/renderer"
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist", "js"),
    libraryTarget: "commonjs2"
  },
  target: "node",
  node: {
    __dirname: false,
    __filename: false
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "source-map-loader",
        enforce: "pre",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new BitBarWebpackProgressPlugin()]
};
