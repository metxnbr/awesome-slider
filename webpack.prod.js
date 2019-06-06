module.exports = {
  mode: "production",
  entry: {
    "awesome-slider": "./src/index.js"
  },
  output: {
    library: "AwesomeSlider",
    libraryTarget: 'umd',
    filename: "[name].min.js",
    path: __dirname + "/dist"
  },
};
