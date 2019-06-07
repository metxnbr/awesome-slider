(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["AwesomeSlider"] = factory();
	else
		root["AwesomeSlider"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/animate.js":
/*!************************!*\
  !*** ./src/animate.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(options) {\r\n  var timing = options.timing;\r\n  var draw = options.draw;\r\n  var duration = options.duration;\r\n\r\n  var start = window && window.performance && window.performance.now();\r\n\r\n  requestAnimationFrame(function animate(time) {\r\n    // timeFraction goes from 0 to 1\r\n    if (!start) start = time;\r\n    var timeFraction = (time - start) / duration;\r\n    if (timeFraction > 1) timeFraction = 1;\r\n\r\n    // calculate the current animation state\r\n    var progress = timing(timeFraction);\r\n\r\n    draw(progress); // draw it\r\n\r\n    if (timeFraction < 1) {\r\n      requestAnimationFrame(animate);\r\n    }\r\n  });\r\n};\r\n\n\n//# sourceURL=webpack://AwesomeSlider/./src/animate.js?");

/***/ }),

/***/ "./src/defaults.js":
/*!*************************!*\
  !*** ./src/defaults.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var indicator = __webpack_require__(/*! ./indicator */ \"./src/indicator.js\");\r\n\r\nmodule.exports = {\r\n  ratio: 1180 / 500,\r\n  duration: 1000 * 0.3, // ms\r\n  autoplay: true,\r\n  interval: 1000 * 3, // ms\r\n  indicator: indicator,\r\n  className: {\r\n    list: '',\r\n    item: ''\r\n  }\r\n};\r\n\n\n//# sourceURL=webpack://AwesomeSlider/./src/defaults.js?");

/***/ }),

/***/ "./src/ele.js":
/*!********************!*\
  !*** ./src/ele.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function Ele() {\r\n  this.create = function(opt) {\r\n    var tag = opt.tag;\r\n    var attr = opt.attr;\r\n    var ele = document.createElement(tag);\r\n    for (var key in attr) {\r\n      ele.setAttribute(key, attr[key]);\r\n    }\r\n    return ele;\r\n  };\r\n}\r\n\r\nmodule.exports = Ele;\r\n\n\n//# sourceURL=webpack://AwesomeSlider/./src/ele.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var animate = __webpack_require__(/*! ./animate */ \"./src/animate.js\");\r\nvar defaults = __webpack_require__(/*! ./defaults */ \"./src/defaults.js\");\r\nvar Ele = __webpack_require__(/*! ./ele */ \"./src/ele.js\");\r\n\r\nfunction AwesomeSlider(images, container, options) {\r\n  // extend options\r\n  this.options = options || {};\r\n  for (var name in defaults) {\r\n    if (this.options[name] === undefined) {\r\n      this.options[name] = defaults[name];\r\n    }\r\n  }\r\n\r\n  this.images = images.slice();\r\n  this.realLen = this.images.length;\r\n  this.len = this.realLen; // 后面要重新赋值\r\n  this.current = 0;\r\n  this.container = container;\r\n  this.height = this.container.clientWidth / this.options.ratio;\r\n\r\n  this.eleCollections = {};\r\n\r\n  this.intervalId = undefined;\r\n\r\n  this.removeAllEventListener = this.unmount; // alias\r\n\r\n  this.init();\r\n}\r\n\r\nAwesomeSlider.prototype.eleHelper = new Ele();\r\n\r\nAwesomeSlider.prototype.animateHelper = animate;\r\n\r\nAwesomeSlider.prototype.smoothImages = function() {\r\n  if (this.realLen <= 1) {\r\n    return;\r\n  }\r\n  var first = this.images[0];\r\n  var last = this.images[this.realLen - 1];\r\n\r\n  this.images.push(first);\r\n  this.images.unshift(last);\r\n  this.len = this.images.length;\r\n};\r\n\r\nAwesomeSlider.prototype.move = function(n) {\r\n  this.eleCollections.list.style.left =\r\n    \"-\" + n * this.eleCollections.listWrap.clientWidth + \"px\";\r\n};\r\n\r\nAwesomeSlider.prototype.getMoveLeft = function() {\r\n  return this.current * this.eleCollections.listWrap.clientWidth;\r\n};\r\n\r\nAwesomeSlider.prototype.play = function(direction) {\r\n  var context = this;\r\n\r\n  direction = direction ? direction : \"next\";\r\n\r\n  var cur = this.current;\r\n\r\n  // change\r\n  if (direction === \"next\") {\r\n    this.current += 1;\r\n  }\r\n\r\n  if (direction === \"previous\") {\r\n    this.current -= 1;\r\n  }\r\n\r\n  // reset\r\n  if (direction === \"next\") {\r\n    if (context.current > context.realLen) {\r\n      context.current = 1;\r\n    }\r\n  }\r\n\r\n  if (direction === \"previous\") {\r\n    if (context.current < 1) {\r\n      context.current = context.realLen;\r\n    }\r\n  }\r\n\r\n  // indicator active\r\n  this.options.indicator && this.options.indicator.active.call(this);\r\n\r\n  this.animateHelper({\r\n    timing: function(n) {\r\n      return n;\r\n    },\r\n    draw: function(p) {\r\n      var left = cur;\r\n\r\n      if (direction === \"next\") {\r\n        var left = cur + p;\r\n      }\r\n\r\n      if (direction === \"previous\") {\r\n        var left = cur - p;\r\n      }\r\n\r\n      context.move.call(context, left);\r\n    },\r\n    duration: this.options.duration\r\n  });\r\n};\r\n\r\nAwesomeSlider.prototype.autoplay = function() {\r\n  var context = this;\r\n  this.intervalId = setInterval(function() {\r\n    context.play();\r\n  }, this.options.interval);\r\n};\r\n\r\nAwesomeSlider.prototype.checkPlayIsDisabled = function() {\r\n  return this.len > this.realLen;\r\n};\r\n\r\nAwesomeSlider.prototype.init = function() {\r\n  var context = this;\r\n\r\n  this.smoothImages();\r\n\r\n  this.createList({\r\n    tag: \"div\",\r\n    attr: {\r\n      class: \"list\"\r\n    }\r\n  });\r\n\r\n  var items = this.mapItem({\r\n    tag: \"div\",\r\n    attr: {\r\n      class: \"item\"\r\n    }\r\n  });\r\n  items.forEach(function(item) {\r\n    context.eleCollections.list.appendChild(item);\r\n  });\r\n\r\n  // indicator style\r\n  this.options.indicator && this.options.indicator.style.call(this);\r\n\r\n  if (this.checkPlayIsDisabled()) {\r\n    this.current += 1;\r\n    this.eleCollections.list.style.left = \"-100%\";\r\n    this.options.autoplay && this.autoplay();\r\n  }\r\n};\r\n\r\nAwesomeSlider.prototype.stopAutoplay = function() {\r\n  if (this.intervalId) {\r\n    clearInterval(this.intervalId);\r\n    this.intervalId = undefined;\r\n  }\r\n};\r\n\r\nAwesomeSlider.prototype.resumeAutoplay = function() {\r\n  if (this.intervalId === undefined) {\r\n    this.autoplay();\r\n  }\r\n};\r\n\r\nAwesomeSlider.prototype.events = [];\r\n\r\nAwesomeSlider.prototype.addEvent = function(add) {\r\n  this.events = this.events.concat(add);\r\n};\r\n\r\nAwesomeSlider.prototype.unmount = function() {\r\n  if (!this.events || this.events.length === 0) return;\r\n\r\n  this.events.forEach(function(item) {\r\n    var element = item.element;\r\n    var event = item.event;\r\n    var fn = item.fn;\r\n    element.removeEventListener(event, fn, false);\r\n  });\r\n  this.events = [];\r\n};\r\n\r\nAwesomeSlider.prototype.createListWrap = function() {\r\n  var context = this;\r\n\r\n  var ele = document.createElement(\"div\");\r\n  this.eleCollections.listWrap = ele;\r\n\r\n  ele.style.position = \"relative\";\r\n  ele.style.overflow = \"hidden\";\r\n  ele.style.height = this.height + \"px\";\r\n\r\n  if (this.checkPlayIsDisabled()) {\r\n    var start = undefined;\r\n    var curLeft = undefined;\r\n    var distance = undefined;\r\n    var limit = 80;\r\n\r\n    function mouseUpOrOut() {\r\n      if (start) {\r\n        if (distance > limit) {\r\n          context.play();\r\n        } else {\r\n          context.eleCollections.list.style.left = \"-\" + curLeft + \"px\";\r\n        }\r\n\r\n        if (distance < -limit) {\r\n          context.play(\"previous\");\r\n        } else {\r\n          context.eleCollections.list.style.left = \"-\" + curLeft + \"px\";\r\n        }\r\n      }\r\n      start = undefined;\r\n    }\r\n\r\n    function move(n) {\r\n      if (start) {\r\n        distance = start - n;\r\n        context.eleCollections.list.style.left =\r\n          \"-\" + (curLeft + distance) + \"px\";\r\n      }\r\n    }\r\n\r\n    var eventsArr = [\r\n      {\r\n        element: ele,\r\n        event: \"mouseover\",\r\n        fn: function() {\r\n          context.stopAutoplay();\r\n        }\r\n      },\r\n      {\r\n        element: ele,\r\n        event: \"mousedown\",\r\n        fn: function(e) {\r\n          e.preventDefault();\r\n          start = e.clientX;\r\n          curLeft = context.getMoveLeft();\r\n        }\r\n      },\r\n      {\r\n        element: document.body,\r\n        event: \"mouseup\",\r\n        fn: function() {\r\n          mouseUpOrOut();\r\n        }\r\n      },\r\n      {\r\n        element: ele,\r\n        event: \"mousemove\",\r\n        fn: function(e) {\r\n          move(e.clientX);\r\n        }\r\n      },\r\n      {\r\n        element: ele,\r\n        event: \"mouseout\",\r\n        fn: function() {\r\n          context.resumeAutoplay();\r\n          mouseUpOrOut();\r\n        }\r\n      },\r\n      {\r\n        element: ele,\r\n        event: \"touchstart\",\r\n        fn: function(e) {\r\n          context.stopAutoplay();\r\n          start = e.touches[0].clientX;\r\n          curLeft = context.getMoveLeft();\r\n        }\r\n      },\r\n      {\r\n        element: ele,\r\n        event: \"touchmove\",\r\n        fn: function(e) {\r\n          move(e.touches[0].clientX);\r\n        }\r\n      },\r\n      {\r\n        element: document.body,\r\n        event: \"touchend\",\r\n        fn: function() {\r\n          context.resumeAutoplay();\r\n          mouseUpOrOut();\r\n        }\r\n      }\r\n    ];\r\n\r\n    this.addEvent(eventsArr);\r\n\r\n    eventsArr.forEach(function(item) {\r\n      var element = item.element;\r\n      var event = item.event;\r\n      var fn = item.fn;\r\n      element.addEventListener(event, fn, false);\r\n    });\r\n  }\r\n\r\n  this.container.appendChild(ele);\r\n\r\n  return ele;\r\n};\r\n\r\nAwesomeSlider.prototype.createList = function() {\r\n  var ele = document.createElement(\"div\");\r\n  if (this.options.className && this.options.className.list) {\r\n    ele.className = this.options.className.list;\r\n  } else {\r\n    ele.style.position = \"absolute\";\r\n    ele.style.left = 0;\r\n    ele.style.top = 0;\r\n    ele.style.fontSize = 0;\r\n  }\r\n\r\n  ele.style.width = this.len + \"00%\";\r\n  ele.style.height = \"100%\";\r\n\r\n  this.createListWrap().appendChild(ele);\r\n  this.eleCollections.list = ele;\r\n};\r\n\r\nAwesomeSlider.prototype.mapItem = function() {\r\n  var context = this;\r\n  var items = [];\r\n  this.images.forEach(function(src) {\r\n    var ele = document.createElement(\"div\");\r\n\r\n    if (context.options.className && context.options.className.item) {\r\n      ele.className = context.options.className.item;\r\n    } else {\r\n      ele.style.display = \"inline-block\";\r\n      ele.style.height = \"100%\";\r\n    }\r\n\r\n    var img = context.eleHelper.create({\r\n      tag: \"img\",\r\n      attr: {\r\n        src\r\n      }\r\n    });\r\n    img.style.width = \"100%\";\r\n    img.style.height = \"100%\";\r\n    ele.appendChild(img);\r\n    ele.style.width = (1 / context.len) * 100 + \"%\";\r\n    items.push(ele);\r\n  });\r\n\r\n  return items;\r\n};\r\n\r\nmodule.exports = AwesomeSlider;\r\n\n\n//# sourceURL=webpack://AwesomeSlider/./src/index.js?");

/***/ }),

/***/ "./src/indicator.js":
/*!**************************!*\
  !*** ./src/indicator.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var options = {\r\n  wrap:\r\n    \"position: absolute;left: 0;right: 0;bottom: 15px;text-align: center;font-size: 0; z-index: 2;\",\r\n  list: \"display: inline-block;\",\r\n  item:\r\n    \"display: inline-block;width: 7px;height: 7px;margin: 0 5px;border-radius: 50%;background-color: #fff;opacity: 0.3;\",\r\n  itemActive:\r\n    \"display: inline-block;width: 7px;height: 7px;margin: 0 5px;border-radius: 50%;background-color: #fff;opacity: 0.8;\"\r\n};\r\n\r\nfunction style() {\r\n  this.eleCollections.indicator = []\r\n  var wrap = document.createElement(\"div\");\r\n  wrap.setAttribute(\"style\", options.wrap);\r\n  this.eleCollections.listWrap.appendChild(wrap);\r\n\r\n  var list = document.createElement(\"div\");\r\n  list.setAttribute(\"style\", options.list);\r\n  wrap.appendChild(list);\r\n\r\n  var i = 0;\r\n  while (i < this.realLen) {\r\n    var item = document.createElement(\"div\");\r\n    if (i === 0) {\r\n      item.setAttribute(\"style\", options.itemActive);\r\n    } else {\r\n      item.setAttribute(\"style\", options.item);\r\n    }\r\n    list.appendChild(item);\r\n    this.eleCollections.indicator.push(item)\r\n    i += 1;\r\n  }\r\n}\r\n\r\nfunction active() {\r\n  var context = this;\r\n  this.eleCollections.indicator.forEach(function(item, i) {\r\n    if (i === context.current - 1) {\r\n      item.setAttribute(\"style\", options.itemActive);\r\n    } else {\r\n      item.setAttribute(\"style\", options.item);\r\n    }\r\n  });\r\n}\r\n\r\nmodule.exports = {\r\n  style: style,\r\n  active: active\r\n};\r\n\n\n//# sourceURL=webpack://AwesomeSlider/./src/indicator.js?");

/***/ })

/******/ });
});