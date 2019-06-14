module.exports = function(options) {
  var timing = options.timing;
  var draw = options.draw;
  var duration = options.duration;

  var start =
    window &&
    window.performance &&
    window.performance.now &&
    window.performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    if (!start) start = time;
    var timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    var progress = timing(timeFraction);

    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
};
