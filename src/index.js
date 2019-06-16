var animate = require("./animate");
var listenerManage = require("./listenerManage");
var debounce = require("./debounce");
var element = require("./element");
var translate = require("./translate");
var easing = require("./easing");
var defaults = require("./defaults");

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
  this.current = this.options.initIndex;
  this.container = container;
  this.height = this.container.clientWidth / this.options.ratio;

  this.eleCollections = {};

  this.intervalId = undefined;

  this.removeAllEventListener = this.unmount; // alias

  this.init();
}

/**
 * utils
 * AwesomeSlider内置方法
 * 因为对自身不影响, 可以作为工具函数为外部所用
 */
AwesomeSlider.prototype.utils = {
  debounce: debounce,
  element: element,
  animate: animate,
  translate: translate
};

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

AwesomeSlider.prototype.jump = function(n) {
  if (n !== this.current) {
    this.current = n;
    // indicator active
    this.indicatorObserver();
  }
  this.eleCollections.list.style.left =
    "-" + n * this.eleCollections.listWrap.clientWidth + "px";
};

AwesomeSlider.prototype.getMoveLeft = function() {
  return this.current * this.eleCollections.listWrap.clientWidth;
};

AwesomeSlider.prototype.translateTo = function(current, to) {
  var timing = this.options.timing;
  if (typeof timing === "string") {
    timing = easing[this.options.timing] || easing.linear;
  }
  var transOpt = this.utils.translate({
    timing: timing,
    duration: this.options.duration
  });
  return transOpt(current, to);
};

AwesomeSlider.prototype.indicatorObserver = function() {
  this.options.indicator &&
    this.options.indicator.active &&
    this.options.indicator.active.call(this, { current: this.current });
};

AwesomeSlider.prototype.play = function(direction, distance) {
  var context = this;

  direction = direction ? direction : "next";

  distance = distance ? distance : 0;

  // change
  if (direction === "next") {
    this.current += 1;
  }

  if (direction === "previous") {
    this.current -= 1;
  }

  // reset
  if (this.current > this.realLen) {
    this.current = 1;
  }

  if (this.current < 1) {
    this.current = this.realLen;
  }

  // indicator active
  this.indicatorObserver();

  var timing = this.options.timing;
  if (typeof timing === "string") {
    timing = easing[this.options.timing] || easing.linear;
  }

  var currentGo =
    -this.eleCollections.listWrap.clientWidth *
      (this.current - (direction === "next" ? 1 : -1)) -
    distance;
  var to = -this.current * this.eleCollections.listWrap.clientWidth;

  var transRun = this.translateTo(currentGo, to);

  transRun(function(x) {
    context.eleCollections.list.style.left = x + "px";
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

  // indicator style
  this.options.indicator &&
    this.options.indicator.style &&
    this.options.indicator.style.call(this, {
      listWrap: this.eleCollections.listWrap,
      realLen: this.realLen,
      initIndex: this.options.initIndex
    });

  if (this.checkPlayIsDisabled()) {
    this.createManual();

    // resize
    if (this.options.enableResize) {
      this.resize();
    }

    this.current += 1;
    this.eleCollections.list.style.left = "-" + this.getMoveLeft() + "px";
    this.options.autoplay && this.autoplay();
  }
};

AwesomeSlider.prototype.resize = function() {
  var context = this;

  var fn = debounce(function() {
    context.jump(context.current);
  }, 1000 * 0.5);

  var event = {
    target: window,
    type: "resize",
    listener: fn
  };

  this.registerAddEventListener(event);
};

AwesomeSlider.prototype.stopAutoplay = function() {
  if (this.intervalId) {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }
};

AwesomeSlider.prototype.resumeAutoplay = function() {
  if (this.intervalId === undefined && this.options.autoplay) {
    this.autoplay();
  }
};

AwesomeSlider.prototype.events = [];

/**
 * add -> Array | Object
 */
AwesomeSlider.prototype.registerAddEventListener = function(add) {
  // 先注册 register
  this.events = this.events.concat(add);

  // 后绑定
  var arrAdd =
    Object.prototype.toString.call(add) === "[object Array]" ? add : [add];

  arrAdd.forEach(function(item) {
    listenerManage(item);
  });
};

AwesomeSlider.prototype.unmount = function() {
  // clear task of autoplay
  this.stopAutoplay();

  if (!this.events || this.events.length === 0) return;

  this.events.forEach(function(item) {
    listenerManage(item, "removeEventListener");
  });

  this.events = [];
};

AwesomeSlider.prototype.createManual = function() {
  if (!this.options.manual) return;

  var context = this;

  var previous = this.options.manual.previous;
  var next = this.options.manual.next;

  var eventsArr = [
    {
      target: previous,
      type: "click",
      listener: function() {
        context.play("previous");
      }
    },
    {
      target: next,
      type: "click",
      listener: function() {
        context.play("next");
      }
    }
  ];

  this.registerAddEventListener(eventsArr);

  this.eleCollections.listWrap.appendChild(previous);
  this.eleCollections.listWrap.appendChild(next);
};

AwesomeSlider.prototype.createListWrap = function() {
  var context = this;

  var ele = document.createElement("div");
  this.eleCollections.listWrap = ele;

  ele.style.position = "relative";
  ele.style.overflow = "hidden";
  ele.style.height = this.height + "px";

  if (this.checkPlayIsDisabled()) {
    var start = undefined;
    var curLeft = undefined;
    var distance = 0;
    var limit = 50;

    function mouseUpOrOut() {
      var goBack = false;
      if (start) {
        if (distance > limit) {
          context.play("next", distance);
        } else {
          goBack = true;
        }

        if (distance < -limit) {
          context.play("previous", distance);
        } else {
          goBack = true;
        }

        if (goBack) {
          context.eleCollections.list.style.left = "-" + curLeft + "px";
        }
      }

      start = undefined;
      distance = 0;
    }

    function move(n) {
      if (start) {
        distance = start - n;
        context.eleCollections.list.style.left =
          "-" + (curLeft + distance) + "px";
      }
    }

    var eventsArr = [
      {
        target: ele,
        type: "mouseover",
        listener: function() {
          context.stopAutoplay();
        }
      },
      {
        target: ele,
        type: "mousedown",
        listener: function(e) {
          e.preventDefault();
          start = e.clientX;
          curLeft = context.getMoveLeft();
        }
      },
      {
        target: document.body,
        type: "mouseup",
        listener: function() {
          mouseUpOrOut();
        }
      },
      {
        target: ele,
        type: "mousemove",
        listener: function(e) {
          move(e.clientX);
        }
      },
      {
        target: ele,
        type: "mouseout",
        listener: function() {
          context.resumeAutoplay();
          mouseUpOrOut();
        }
      },
      {
        target: ele,
        type: "touchstart",
        listener: function(e) {
          context.stopAutoplay();
          start = e.touches[0].clientX;
          curLeft = context.getMoveLeft();
        }
      },
      {
        target: ele,
        type: "touchmove",
        listener: function(e) {
          move(e.touches[0].clientX);
        }
      },
      {
        target: document.body,
        type: "touchend",
        listener: function() {
          context.resumeAutoplay();
          mouseUpOrOut();
        }
      }
    ];

    this.registerAddEventListener(eventsArr);
  }

  this.container.appendChild(ele);

  return ele;
};

AwesomeSlider.prototype.createList = function() {
  var ele = document.createElement("div");

  ele.style.position = "absolute";
  ele.style.left = 0;
  ele.style.top = 0;
  ele.style.fontSize = 0;
  ele.style.width = this.len + "00%";
  ele.style.height = "100%";

  this.createListWrap().appendChild(ele);
  this.eleCollections.list = ele;
};

AwesomeSlider.prototype.downloadingImage = function(image, options) {
  var context = this;

  var downloading = options && options.downloading;
  var placeholder = options && options.placeholder;

  if (downloading) {
    // start loading
    downloading.style.display = "block";
  }

  function d(ele, event) {
    if (ele) {
      context.registerAddEventListener(event);
    }
  }

  d(downloading, {
    target: image,
    type: "load",
    listener: function() {
      downloading.style.display = "none";
    }
  });

  d(placeholder, {
    target: image,
    type: "error",
    listener: function() {
      downloading.style.display = "none";
      placeholder.style.display = "block";
    }
  });
};

AwesomeSlider.prototype.imgShort = function(img) {
  var context = this;

  return function(options) {
    var ele = document.createElement("img");
    ele.style.width = "100%";
    ele.style.height = "100%";

    ele.setAttribute("src", img);
    context.downloadingImage(ele, options);
    return ele;
  };
};

AwesomeSlider.prototype.imgDetail = function(obj) {
  var context = this;

  return function(options) {
    var tagName = obj.tagName;
    var attrs = obj.attrs;
    var children = obj.children;

    var ele = document.createElement(tagName);
    for (var prop in attrs) {
      ele.setAttribute(prop, attrs[prop]);
    }

    for (var prop in attrs) {
      if (tagName === "img" && prop === "src") {
        context.downloadingImage(ele, options);
        break;
      }
    }

    if (children) {
      children.forEach(function(item) {
        if (typeof item === "string") {
          var text = document.createTextNode(item);
          ele.appendChild(text);
        } else {
          ele.appendChild(context.imgDetail(item)(options));
        }
      });
    }

    return ele;
  };
};

AwesomeSlider.prototype.mapItem = function() {
  var context = this;
  var items = [];

  this.images.forEach(function(img) {
    var ele = document.createElement("div");

    ele.style.display = "inline-block";
    ele.style.height = "100%";
    ele.style.position = "relative";
    ele.style.verticalAlign = "middle";
    ele.style.width = (1 / context.len) * 100 + "%";

    var downloading = null;
    var placeholder = null;
    var lineHeight = context.height + "px";
    if (context.options.imageDownloading) {
      downloading = context.options.imageDownloading.cloneNode(true);
      downloading.style.lineHeight = lineHeight;
      downloading.style.display = "none";
      ele.appendChild(downloading);
    }

    if (context.options.imagePlaceholder) {
      placeholder = context.options.imagePlaceholder.cloneNode(true);
      placeholder.style.lineHeight = lineHeight;
      placeholder.style.display = "none";
      ele.appendChild(placeholder);
    }

    var imgEle = null;

    if (typeof img === "string") {
      imgEle = context.imgShort(img)({
        downloading: downloading,
        placeholder: placeholder
      });
    } else {
      imgEle = context.imgDetail(img)({
        downloading: downloading,
        placeholder: placeholder
      });
    }

    ele.appendChild(imgEle);

    items.push(ele);
  });

  return items;
};

module.exports = AwesomeSlider;
