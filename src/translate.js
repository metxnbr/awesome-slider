var animate = require("./animate");
var easing = require("./easing");

module.exports = function(options) {
  return function(current, to) {
    return function(run) {
      var dis = to - current;
      var timing = options.timing || easing.linear;
      var duration = options.duration || 0.5 * 1000;
      animate({
        timing: timing,
        draw: function(p) {
          var x = p * dis;
          run && run(current + x);
        },
        duration: duration
      });
    };
  };
};
