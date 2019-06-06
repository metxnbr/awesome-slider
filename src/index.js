var animate = require("./animate");
var defaults = require("./defaults");

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

function AwesomeSlider(images, container, options) {
  // extend options
  this.options = options || {};
  for (var name in defaults) {
    if (this.options[name] === undefined) {
      this.options[name] = defaults[name];
    }
  }

  this.images = images.slice();
  this.realLen = this.images.length;
  this.len = this.realLen; // 后面要重新赋值
  this.current = 0;
  this.container = container;
  this.height = this.container.clientWidth / this.options.ratio;

  this.eleCollections = {};

  this.intervalId = undefined;

  this.init();
}

AwesomeSlider.prototype.eleHelper = new Ele();

AwesomeSlider.prototype.animateHelper = animate;

AwesomeSlider.prototype.smoothImages = function() {
  if (this.realLen <= 1) {
    return;
  }
  var first = this.images[0];
  var last = this.images[this.realLen - 1];

  this.images.push(first);
  this.images.unshift(last);
  this.len = this.images.length;
};

AwesomeSlider.prototype.indicatorActive = function() {
  var context = this;
  this.eleCollections.indicator.forEach(function(item, i) {
    if (i === context.current - 1) {
      item.setAttribute("style", context.options.indicator.options.itemActive);
    } else {
      item.setAttribute("style", context.options.indicator.options.item);
    }
  });
};

AwesomeSlider.prototype.move = function(n) {
  this.eleCollections.list.style.left =
    "-" + n * this.eleCollections.listWrap.clientWidth + "px";
};

AwesomeSlider.prototype.getMoveLeft = function() {
  return this.current * this.eleCollections.listWrap.clientWidth;
};

AwesomeSlider.prototype.play = function(direction) {
  var context = this;

  direction = direction ? direction : "next";

  var cur = this.current;

  // change
  if (direction === "next") {
    this.current += 1;
  }

  if (direction === "previous") {
    this.current -= 1;
  }

  // reset
  if (direction === "next") {
    if (context.current > context.realLen) {
      context.current = 1;
    }
  }

  if (direction === "previous") {
    if (context.current < 1) {
      context.current = context.realLen;
    }
  }

  // indicatorActive
  this.indicatorActive();

  this.animateHelper({
    timing: function(n) {
      return n;
    },
    draw: function(p) {
      var left = cur;

      if (direction === "next") {
        var left = cur + p;
      }

      if (direction === "previous") {
        var left = cur - p;
      }

      context.move.call(context, left);
    },
    duration: this.options.duration
  });
};

AwesomeSlider.prototype.autoplay = function() {
  var context = this;
  this.intervalId = setInterval(function() {
    context.play();
  }, this.options.interval);
};

AwesomeSlider.prototype.checkPlayIsDisabled = function() {
  return this.len > this.realLen;
};

AwesomeSlider.prototype.init = function() {
  var context = this;

  this.smoothImages();

  this.createList({
    tag: "div",
    attr: {
      class: "list"
    }
  });

  var items = this.mapItem({
    tag: "div",
    attr: {
      class: "item"
    }
  });
  items.forEach(function(item) {
    context.eleCollections.list.appendChild(item);
  });

  // indicator
  this.options.indicator.create.call(this);

  if (this.checkPlayIsDisabled()) {
    this.current += 1;
    this.eleCollections.list.style.left = "-100%";
    this.options.autoplay && this.autoplay();
  }
};

AwesomeSlider.prototype.stopAutoplay = function() {
  if (this.intervalId) {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }
};

AwesomeSlider.prototype.resumeAutoplay = function() {
  if (this.intervalId === undefined) {
    this.autoplay();
  }
};

AwesomeSlider.prototype.events = [];

AwesomeSlider.prototype.unmount = function() {
  this.events.forEach(function(item) {
    var element = item.element;
    var event = item.event;
    var fn = item.fn;
    element.removeEventListener(event, fn, false);
  });
};

AwesomeSlider.prototype.createListWrap = function() {
  var context = this;

  var ele = document.createElement("div");
  this.eleCollections.listWrap = ele;

  ele.style.position = "relative";
  ele.style.overflow = "hidden";
  ele.style.height = this.height + "px";

  if (this.options.autoplay && this.checkPlayIsDisabled()) {
    var start = undefined;
    var curLeft = undefined;
    var distance = undefined;
    var limit = 80;

    function mouseUpOrOut() {
      if (start) {
        if (distance > limit) {
          context.play();
        } else {
          context.eleCollections.list.style.left = "-" + curLeft + "px";
        }

        if (distance < -limit) {
          context.play("previous");
        } else {
          context.eleCollections.list.style.left = "-" + curLeft + "px";
        }
      }
      start = undefined;
    }

    function move(n) {
      if (start) {
        distance = start - n;
        context.eleCollections.list.style.left =
          "-" + (curLeft + distance) + "px";
      }
    }

    this.events = [
      {
        element: ele,
        event: "mouseover",
        fn: function() {
          context.stopAutoplay();
        }
      },
      {
        element: ele,
        event: "mousedown",
        fn: function(e) {
          e.preventDefault();
          start = e.clientX;
          curLeft = context.getMoveLeft();
        }
      },
      {
        element: document.body,
        event: "mouseup",
        fn: function() {
          mouseUpOrOut();
        }
      },
      {
        element: ele,
        event: "mousemove",
        fn: function(e) {
          move(e.clientX);
        }
      },
      {
        element: ele,
        event: "mouseout",
        fn: function() {
          context.resumeAutoplay();
          mouseUpOrOut();
        }
      },
      {
        element: ele,
        event: "touchstart",
        fn: function(e) {
          context.stopAutoplay();
          start = e.touches[0].clientX;
          curLeft = context.getMoveLeft();
        }
      },
      {
        element: ele,
        event: "touchmove",
        fn: function(e) {
          move(e.touches[0].clientX);
        }
      },
      {
        element: document.body,
        event: "touchend",
        fn: function() {
          context.resumeAutoplay();
          mouseUpOrOut();
        }
      }
    ];

    this.events.forEach(function(item) {
      var element = item.element;
      var event = item.event;
      var fn = item.fn;
      element.addEventListener(event, fn, false);
    });
  }

  this.container.appendChild(ele);

  return ele;
};

AwesomeSlider.prototype.createList = function() {
  var ele = this.eleHelper.create(this.options.eleConfig.list);
  ele.style.width = this.len + "00%";
  ele.style.height = "100%";

  this.createListWrap().appendChild(ele);
  this.eleCollections.list = ele;
};

AwesomeSlider.prototype.mapItem = function() {
  var context = this;
  var items = [];
  this.images.forEach(function(src) {
    var ele = context.eleHelper.create(context.options.eleConfig.item);
    ele.style.position = "relative";
    var layer = document.createElement("div");
    layer.setAttribute(
      "style",
      "position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: 2"
    );
    var img = context.eleHelper.create({
      tag: "img",
      attr: {
        src
      }
    });
    img.style.width = "100%";
    img.style.height = "100%";
    // ele.appendChild(layer);
    ele.appendChild(img);
    ele.style.width = (1 / context.len) * 100 + "%";
    items.push(ele);
  });

  return items;
};

module.exports = AwesomeSlider;
