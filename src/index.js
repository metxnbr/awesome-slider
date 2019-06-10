var animate = require("./animate");
var debounce = require("./debounce");
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

  // indicator active
  this.options.indicator && this.options.indicator.active.call(this);

  var timing = this.options.timing;
  if (typeof timing === "string") {
    timing = easing[this.options.timing] || easing.linear;
  }
  this.animateHelper({
    timing: timing,
    draw: function(p) {
      var left = cur;

      if (direction === "next") {
        var left = cur + p;
      }

      if (direction === "previous") {
        var left = cur - p;
      }

      context.move(left);
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

  // indicator style
  this.options.indicator && this.options.indicator.style.call(this);

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
    console.log("resize");
    context.move(context.current);
  }, 1000 * 0.5);

  var event = {
    element: window,
    event: "resize",
    fn: fn
  };

  this.addEvent(event);
  event.element.addEventListener(event.event, event.fn, false);
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
AwesomeSlider.prototype.addEvent = function(add) {
  this.events = this.events.concat(add);
};

AwesomeSlider.prototype.unmount = function() {
  if (!this.events || this.events.length === 0) return;

  this.events.forEach(function(item) {
    var element = item.element;
    var event = item.event;
    var fn = item.fn;
    element.removeEventListener(event, fn, false);
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
      element: previous,
      event: "click",
      fn: function() {
        context.play("previous");
      }
    },
    {
      element: next,
      event: "click",
      fn: function() {
        context.play("next");
      }
    }
  ];

  this.addEvent(eventsArr);

  eventsArr.forEach(function(item) {
    var element = item.element;
    var event = item.event;
    var fn = item.fn;
    element.addEventListener(event, fn, false);
  });

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

    this.addEvent(eventsArr);

    eventsArr.forEach(function(item) {
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
  var ele = document.createElement("div");
  if (this.options.className && this.options.className.list) {
    ele.className = this.options.className.list;
  } else {
    ele.style.position = "absolute";
    ele.style.left = 0;
    ele.style.top = 0;
    ele.style.fontSize = 0;
  }

  ele.style.width = this.len + "00%";
  ele.style.height = "100%";

  this.createListWrap().appendChild(ele);
  this.eleCollections.list = ele;
};

AwesomeSlider.prototype.downloadingImage = function(image, options) {
  var context = this;
  var downloading = options.downloading;
  var placeholder = options.placeholder;

  function d(ele, event) {
    if (ele) {
      context.addEvent(event);
      event.element.addEventListener(event.event, event.fn, false);
    }
  }

  d(downloading, {
    element: image,
    event: "load",
    fn: function() {
      downloading.style.display = "none";
    }
  });

  d(placeholder, {
    element: image,
    event: "error",
    fn: function() {
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

  return function() {
    var tagName = obj.tagName;
    var attrs = obj.attrs;
    var children = obj.children;

    var ele = document.createElement(tagName);
    for (var prop in attrs) {
      ele.setAttribute(prop, attrs[prop]);
    }

    if (children) {
      children.forEach(function(item) {
        ele.appendChild(context.imgDetail(item)());
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

    if (context.options.className && context.options.className.item) {
      ele.className = context.options.className.item;
    } else {
      ele.style.display = "inline-block";
      ele.style.height = "100%";
    }

    ele.style.position = "relative";
    ele.style.width = (1 / context.len) * 100 + "%";

    var downloading = null;
    var placeholder = null;
    var lineHeight = context.height + "px";
    if (context.options.imageDownloading) {
      downloading = context.options.imageDownloading.cloneNode(true);
      downloading.style.lineHeight = lineHeight;
      downloading.style.display = "block";
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
