module.exports = {
  mode: "development",
  entry: {
    "awesome-slider": "./src/index.js"
  },
  output: {
    library: "AwesomeSlider",
    libraryTarget: 'umd',
    filename: "[name].dev.js",
    path: __dirname + "/dist"
  },
};
