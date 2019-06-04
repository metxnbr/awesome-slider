function main() {
  var imagesCommon = ["./assets/1.png", "./assets/2.png", "./assets/3.png"];

  var root = document.getElementById("root");

  var create = AwesomeSlider.prototype.eleHelper.create;

  function appendContainer() {
    var container = create({
      tag: "div",
      attr: { class: "container" }
    });
    root.appendChild(container);
    return container;
  }

  var fns = [
    function() {
      var container = appendContainer();
      var awesomeSlider = new AwesomeSlider(imagesCommon, container);
    },
    function() {
      var container = appendContainer();
      var images = ["./assets/1.png"];
      var awesomeSlider = new AwesomeSlider(images, container);
    },
    function() {
      var container = appendContainer();
      var awesomeSlider = new AwesomeSlider(imagesCommon, container);
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
