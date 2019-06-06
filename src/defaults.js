function indicator() {
  var wrap = document.createElement("div");
  wrap.setAttribute("style", this.options.indicator.options.wrap);
  this.eleCollections.listWrap.appendChild(wrap);

  var list = document.createElement("div");
  list.setAttribute("style", this.options.indicator.options.list);
  wrap.appendChild(list);

  var i = 0;
  this.eleCollections.indicator = [];
  while (i < this.realLen) {
    var item = document.createElement("div");
    if (i === 0) {
      item.setAttribute("style", this.options.indicator.options.itemActive);
    } else {
      item.setAttribute("style", this.options.indicator.options.item);
    }
    list.appendChild(item);
    this.eleCollections.indicator.push(item);
    i += 1;
  }
}

module.exports = {
  ratio: 1180 / 500,
  duration: 1000 * 0.3, // ms
  autoplay: true,
  interval: 1000 * 3, // ms
  indicator: {
    options: {
      wrap:
        "position: absolute;left: 0;right: 0;bottom: 15px;text-align: center;font-size: 0; z-index: 2;",
      list: "display: inline-block;",
      item:
        "display: inline-block;width: 7px;height: 7px;margin: 0 5px;border-radius: 50%;background-color: #fff;opacity: 0.3;",
      itemActive:
        "display: inline-block;width: 7px;height: 7px;margin: 0 5px;border-radius: 50%;background-color: #fff;opacity: 0.8;"
    },
    create: indicator
  },
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
}