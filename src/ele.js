function Ele() {
  this.create = function(opt) {
    var tag = opt.tag;
    var attr = opt.attr;
    var ele = document.createElement(tag);
    for (var key in attr) {
      ele.setAttribute(key, attr[key]);
    }
    return ele;
  };
}

module.exports = Ele;
