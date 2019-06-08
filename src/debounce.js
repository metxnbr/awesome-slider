function debounce(func, wait) {
  var timeout;
  return function() {
    var argus = arguments;
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, argus), wait);
  };
}

module.exports = debounce;
