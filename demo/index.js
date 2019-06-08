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
      var text = "默认的轮播";
      var container = appendContainer(text);
      var awesomeSlider = new AwesomeSlider(imagesCommon, container);
    },
    function() {
      var text = "轮播中点击有链接跳转";
      var container = appendContainer(text);
      var images = [
        {
          tagName: "a",
          attrs: {
            href: "https://metxnbr.github.io/awesome-slider/demo/assets/1.png",
            style: "width:100%; height: 100%",
            target: "_blank"
          },
          children: [
            {
              tagName: "img",
              attrs: {
                src: "./assets/1.png",
                style: "width:100%; height: 100%"
              }
            }
          ]
        },
        {
          tagName: "a",
          attrs: {
            href: "https://metxnbr.github.io/awesome-slider/demo/assets/2.png",
            style: "width:100%; height: 100%",
            target: "_blank"
          },
          children: [
            {
              tagName: "img",
              attrs: {
                src: "./assets/2.png",
                style: "width:100%; height: 100%"
              }
            }
          ]
        },
        {
          tagName: "a",
          attrs: {
            href: "https://metxnbr.github.io/awesome-slider/demo/assets/3.png",
            style: "width:100%; height: 100%",
            target: "_blank"
          },
          children: [
            {
              tagName: "img",
              attrs: {
                src: "./assets/3.png",
                style: "width:100%; height: 100%"
              }
            }
          ]
        }
      ];
      var awesomeSlider = new AwesomeSlider(images, container);
    },
    function() {
      var text = "仅一张图片, 没有轮播效果";
      var container = appendContainer(text);
      var images = ["./assets/1.png"];
      var awesomeSlider = new AwesomeSlider(images, container);
    },
    function() {
      var text = "自定义手动切换轮播的按钮组件";
      var container = appendContainer(text);
      var awesomeSlider = new AwesomeSlider(imagesCommon, container, {
        manual: manual()
      });
    },
    function() {
      var text = "图片的宽高比设置";
      var container = appendContainer(text);
      var awesomeSlider = new AwesomeSlider(imagesCommon, container, {
        ratio: 5 / 1
      });
    },
    function() {
      var text = "自定义指示器";
      var container = appendContainer(text);
      var awesomeSlider = new AwesomeSlider(imagesCommon, container, {
        indicator: indicator()
      });
    },
    function() {
      var text = "初始展示第2张,同时也关闭了自动轮播";
      var container = appendContainer(text);
      var awesomeSlider = new AwesomeSlider(imagesCommon, container, {
        initIndex: 1,
        autoplay: false
      });
    }
  ];

  for (var i = 0; i < fns.length; i++) {
    fns[i]();
  }
}

function indicator() {
  var text = "";
  var wrap = null;
  return {
    style: function() {
      text = this.options.initIndex + 1 + " / " + this.realLen;
      wrap = document.createElement("div");
      wrap.className = "custom-indicator-wrap";
      var textNode = document.createTextNode(text);
      wrap.appendChild(textNode);
      this.eleCollections.listWrap.appendChild(wrap);
    },

    active: function() {
      text = this.current + " / " + this.realLen;
      wrap.innerText = text;
    }
  };
}

function manual() {
  var previous = document.createElement("div");
  previous.className = "manual-btn manual-previous";

  var next = document.createElement("div");
  next.className = "manual-btn manual-next";

  return {
    previous: previous,
    next: next
  };
}

function readyGo(func) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", func);
  } else {
    func();
  }
}

readyGo(main);
