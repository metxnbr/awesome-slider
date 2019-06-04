function animate({ timing, draw, duration }) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    let progress = timing(timeFraction);

    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

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

var defaults = {
  ratio: 1180 / 500,
  duration: 1000 * 0.3, // ms
  autoplay: true,
  interval: 1000 * 3, // ms
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

AwesomeSlider.prototype.play = function(direction) {
  var context = this;

  direction = direction ? direction : "next";

  var list = this.eleCollections.list;
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

      left = parseInt(left * 100);
      list.style.left = "-" + left + "%";
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

AwesomeSlider.prototype.createListWrap = function() {
  var context = this;

  var ele = document.createElement("div");

  ele.style.position = "relative";
  ele.style.overflow = "hidden";
  ele.style.height = this.height + "px";

  if (this.options.autoplay && this.checkPlayIsDisabled()) {
    ele.addEventListener(
      "mouseover",
      function() {
        context.stopAutoplay();
      },
      false
    );

    ele.addEventListener(
      "pointerleave",
      function() {
        context.resumeAutoplay();
      },
      false
    );
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
    var img = context.eleHelper.create({
      tag: "img",
      attr: {
        src
      }
    });
    img.style.width = "100%";
    img.style.height = "100%";
    ele.appendChild(img);
    ele.style.width = (1 / context.len) * 100 + "%";
    items.push(ele);
  });

  return items;
};
