# awesome-slider

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
var awesomeSlider = new AwesomeSlider(images, container, [options]);
```

### images

- Type : `Array<String | object>`
- Default: `undefined`
- Usage

可以是简单模式

```js
[
  "./images/.jpg",
  "./images/2.jpg",
  "./images/3.jpg",
  "./images/4.jpg",
]
```

也可以自由组合

```js
[
  {
    tagName: "a",
    attrs: {
      style: "",
      class: "",
      href: "https://wwww.example.com"
    },
    children: [
    "this just textNote, not object",
    {
      tagName: "div",
      attrs: {
      style:""
    },
  },
  "./images/example.jpg"
]
```

### container

- Type : `Object`
- Default: `undefined`
- Usage

包裹 images 的 html 元素

### options

#### `ratio`

- Type : `Number`
- Default: `1180 / 500`
- Usage

宽高比

#### `duration`

- Type : `Number`
- Default: `1000 * 0.5`
- Usage

轮播动画过渡的时长(ms)

#### `autoplay`

- Type : `Boolean`
- Default: `true`
- Usage

是否开启自动轮播

#### `interval`

- Type : `Number`
- Default: `1000 * 5`
- Usage

自动轮播的间隔时长(ms)

#### `indicator`

- Type : `{style: Function, active: Function}`
- Default: `indicator`
- Usage

轮播状态的指示
`js`创建`html`, 通过有传递的参数做样式交互,
如果要使用`this`, 就不要使用箭头函数, 一般现有传递的参数够用

```js
  const style = ({
    listWrap,
    realLen,
    initIndex,
  }) => {}

  const style = ({
    current
  }) => {}

  const indicator = {
    style,
    active
  }
```

#### `initIndex`

- Type : `number`
- Default: `0`
- Usage

初始展示的图片的序号

#### `manual`

- Type : `{previous: Object, next: Object}`
- Default: `null`
- Usage

`js`创建`html`, 插入两部分, 分别是`previous`和`next`

#### `timing`

- Type : `String | Function`
- Default: `linear`
- Usage

轮播动画类型

#### `enableResize`

- Type : `Boolean`
- Default: `false`
- Usage

是否开启窗口大小变化的监听

> tip:如果`container`的大小是随窗口改变自适应的, 建议开启, 可以自动调整轮播图到正确位置

#### `imageDownloading`

- Type : `Object`
- Default: `null`
- Usage

`js`创建`html`, 插入图片加载的效果

#### `imagePlaceholder`

- Type : `Object`
- Default: `null`
- Usage

`js`创建`html`, 插入图片加载失败的占位

## Note

使用了`requestAnimationFrame`, 如果要向低浏览器兼容, 可以自行引入`requestAnimationFrame polyfill` 比如`yarn add raf`
