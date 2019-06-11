function main() {
  var imagesCommon = ["./assets/1.png", "./assets/2.png", "./assets/3.png"];

  var root = document.getElementById("root");

  function appendContainer(text) {
    var container = document.createElement("div");
    container.className = "container";

    root.appendChild(container);

    if (text) {
      var introduce = document.createElement("div");
      introduce.className = "introduce";
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
      var text = "(1)不仅仅是图片, 可以自定义内容;(2)图片链接, 点击会跳转;(3)一张图片 (4)一张无法加载的图片";
      var container = appendContainer(text);
      var images = [
        {
          tagName: "div",
          attrs: {
            style:
              "width:100%; height: 100%; background-color: pink; font-size: 32px; color: #fff;"
          },
          children: [
            "It's not just picture",
            {
              tagName: "div",
              attrs: {
                style:
                  "width:100%; height: 100%; background-color: pink; font-size: 14px; color: #fff;"
              },
              children: [
                "text text text text text text text text text text text text text"
              ]
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
          tagName: "img",
          attrs: {
            src: "./assets/3.png",
            style: "width:100%; height: 100%"
          }
        },
        {
          tagName: "img",
          attrs: {
            src: "./assets/none.png",
            style: "width:100%; height: 100%"
          }
        }
      ];
      var awesomeSlider = new AwesomeSlider(images, container, {
        autoplay: false,
        imageDownloading: imageDownloading(),
        imagePlaceholder: imagePlaceholder()
      });
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
        autoplay: false,
        enableResize: true
      });
    },
    function() {
      var text = "自定义轮播图片加载时的效果和加载失败时的占位";
      var container = appendContainer(text);
      var images = imagesCommon.concat("./assets/none.png");
      var awesomeSlider = new AwesomeSlider(images, container, {
        imageDownloading: imageDownloading(),
        imagePlaceholder: imagePlaceholder()
      });
    },
    function() {
      var text = "尝试下不一样的轮播切换效果";
      var container = appendContainer(text);
      var awesomeSlider = new AwesomeSlider(imagesCommon, container, {
        duration: 1000 * 1,
        timing: "easeOutCubic"
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

function imageDownloading() {
  var ele = document.createElement("div");
  ele.className = "image-downloading";
  var text = document.createTextNode("loading...");
  ele.appendChild(text);
  return ele;
}

function imagePlaceholder() {
  var ele = document.createElement("div");
  ele.className = "image-placeholder";
  var text = document.createTextNode("error");
  ele.appendChild(text);
  return ele;
}

function readyGo(func) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", func);
  } else {
    func();
  }
}

readyGo(main);
