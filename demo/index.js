function main() {
  var imagesCommon = ["./assets/1.png", "./assets/2.png", "./assets/3.png"];

  var root = document.getElementById("root");

  var create = AwesomeSlider.prototype.eleHelper.create;

  function appendContainer(text) {
    var container = create({
      tag: "div",
      attr: { class: "container" }
    });
    root.appendChild(container);

    if (text) {
      var introduce = create({
        tag: "div",
        attr: { class: "introduce" }
      });
      var textNode = document.createTextNode(text);
      introduce.appendChild(textNode);
      container.appendChild(introduce);
    }
    return container;
  }

  var fns = [
    function() {
      var text = '默认的轮播'
      var container = appendContainer(text);
      var awesomeSlider = new AwesomeSlider(imagesCommon, container);
    },
    function() {
      var text = '仅一张图片, 没有轮播效果'
      var container = appendContainer(text);
      var images = ["./assets/1.png"];
      var awesomeSlider = new AwesomeSlider(images, container);
    },
    function() {
      var text = '图片的宽高比设置'
      var container = appendContainer(text);
      var awesomeSlider = new AwesomeSlider(imagesCommon, container, {
        ratio: 5 / 1
      });
    }
  ];

  for (var i = 0; i < fns.length; i++) {
    fns[i]();
  }
}

function readyGo(func) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", func);
  } else {
    func();
  }
}

readyGo(main);