var imagesCommon = ["./assets/1.png", "./assets/2.png", "./assets/3.png"];
var containers = document.querySelectorAll(".container");

var fns = [
  function() {
    var awesomeSlider = new AwesomeSlider(imagesCommon, containers[0]);
  },
  function() {
    var images = ["./assets/1.png"];
    var awesomeSlider = new AwesomeSlider(images, containers[1]);
  },
  function() {
    var awesomeSlider = new AwesomeSlider(imagesCommon, containers[2]);
  }
];

function readyGo(func) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", func);
  } else {
    func();
  }
}

function main() {
  for (var i = 0; i < fns.length; i++) {
    fns[i]();
  }
}

readyGo(main);
