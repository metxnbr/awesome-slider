# awesome-slider (alpha)

a vanilla javascript slider/carousel/swiper plugin.

[Demo](https://metxnbr.github.io/awesome-slider/demo/) 🚀

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
options = {};
```

## Note

使用了`requestAnimationFrame`, 如果要向低浏览器兼容, 可以自行引入`requestAnimationFrame polyfill` 比如`yarn add raf`
