var indicator = require("./indicator");

module.exports = {
  ratio: 1180 / 500,
  duration: 1000 * 0.3, // ms
  autoplay: true,
  interval: 1000 * 5, // ms
  indicator: indicator,
  initIndex: 0,
  manual: null,
  className: {
    list: "",
    item: ""
  }
};
