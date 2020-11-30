const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/components/App.jsx",
  output: {
    path: path.resolve(__dirname, "public/build"),
    filename: "main.js",
    publicPath: "./public/",
  },

  module: {
    rules: [
      {
        test: /jsx?$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
};
