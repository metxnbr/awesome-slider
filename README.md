# awesome-slider (alpha)

a vanilla javascript slider/carousel/swiper plugin.

## Demo

[Demo 合集](https://metxnbr.github.io/awesome-slider/demo/) 🚀

如果在框架中使用, 比如`react`, 需要在组件`unmount`时, 移除所有相关监听事件. 示例:

[awesome-slider in react](https://codesandbox.io/embed/reactawesomeslider-wtbjc)

## install

`yarn add awesome-slider`

## usage

### overview

```js
var slider = new Slider(images, container, [options]);
```

### images

数组, 图片的 src

### container

包裹 images 的 dom 元素

### options

```js
options = {
  // 宽高比
  ratio: 5 / 1,

  // 是否自动轮播
  autoplay: Boolean,

  // 轮播图切换的速度
  duration: Number // ms

  // 自动轮播的间隔
  interval: Number, // ms

  // 指示器 定义false或null, 无指示器显示
  indicator: {
    style: Function,
    active: Function,
  },

  // 定义有效的className的子集class, 会替换默认的style样式
  className: {
    list: '',
    item: ''
  }
};
```

## Note

使用了`requestAnimationFrame`, 如果要向低浏览器兼容, 可以自行引入`requestAnimationFrame polyfill` 比如`yarn add raf`
