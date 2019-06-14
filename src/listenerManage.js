module.exports = function(obj, method) {
  method = method ? method : "addEventListener";

  var target = obj.target;
  var type = obj.type;
  var listener = obj.listener;
  var useCapture = obj.useCapture || false;

  target[method](type, listener, useCapture);
};
