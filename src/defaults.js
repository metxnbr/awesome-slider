var indicator = require("./indicator");

module.exports = {
  ratio: 1180 / 500,
  duration: 1000 * 0.3, // ms
  autoplay: true,
  interval: 1000 * 3, // ms
  indicator: indicator,
  eleConfig: {
    list: {
      tag: "ul",
      attr: {
        class: "list"
      }
    },
    item: {
      tag: "li",
      attr: {
        class: "item"
      }
    }
  }
};
