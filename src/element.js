function createElem(tagName, options) {
  var attrs = options.attrs || {};
  var children = options.children || [];

  return {
    tagName: tagName,
    attrs: attrs,
    children: children
  };
}

function renderElem(options) {
  var tagName = options.tagName;
  var attrs = options.attrs || {};
  var children = options.children || [];

  var ele = document.createElement(tagName);

  for (var prop in attrs) {
    ele.setAttribute(prop, attrs[prop]);
  }

  children.forEach(function(item) {
    ele.appendChild(render(item));
  });

  return ele;
}

function render(node) {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }
  return renderElem(node);
}

module.exports = {
  createElem: createElem,
  renderElem: renderElem,
  render: render
};
