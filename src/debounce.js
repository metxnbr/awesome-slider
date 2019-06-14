function debounce(func, wait) {
  var timeout;
  return function() {
    var argus = arguments;
    var context = this;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      func.apply(context, argus);
    }, wait);
  };
}

module.exports = debounce;
