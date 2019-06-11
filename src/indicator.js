var options = {
  wrap:
    "position: absolute;left: 0;right: 0;bottom: 15px;text-align: center;font-size: 0; z-index: 4;",
  list: "display: inline-block;",
  item:
    "display: inline-block;width: 7px;height: 7px;margin: 0 5px;border-radius: 50%;background-color: #fff;opacity: 0.3;",
  itemActive:
    "display: inline-block;width: 7px;height: 7px;margin: 0 5px;border-radius: 50%;background-color: #fff;opacity: 0.8;"
};

function style(obj) {
  var listWrap = obj.listWrap;
  var realLen = obj.realLen;
  var initIndex = obj.initIndex;

  this.eleCollections.indicator = [];
  var wrap = document.createElement("div");
  wrap.setAttribute("style", options.wrap);

  var list = document.createElement("div");
  list.setAttribute("style", options.list);

  var i = 0;
  while (i < realLen) {
    var item = document.createElement("div");
    if (i === initIndex) {
      item.setAttribute("style", options.itemActive);
    } else {
      item.setAttribute("style", options.item);
    }
    list.appendChild(item);
    this.eleCollections.indicator.push(item);
    i += 1;
  }

  wrap.appendChild(list);
  
  listWrap.appendChild(wrap);
}

function active(obj) {
  var current = obj.current;

  this.eleCollections.indicator.forEach(function(item, i) {
    if (i === current - 1) {
      item.setAttribute("style", options.itemActive);
    } else {
      item.setAttribute("style", options.item);
    }
  });
}

module.exports = {
  style: style,
  active: active
};
