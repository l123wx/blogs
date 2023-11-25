---
title: '响应式布局 - 通过 CSS 实现无缝缩放字体大小'
date: '2023-11-24'
spoiler: '只需设置最大最小的字体值，就能实现字体大小的自动变化'
---

<style>
    :root {
        --min-size: 16;
    	--max-size: 16;
        --viewport-min: 320;
        --viewport-max: 2400;
        --container-min: 320;
        --container-max: 2400;
    }
    .container-border {
        padding: 10px;
        border: 1px dashed var(--textNormal);
        margin-top: 10px;
    }
    .container {
        container-type: inline-size;
        box-sizing: content-box;
    }
    .style-container {
        background-color: var(--textNormal);
        color: var(--bg);
        display: inline-block;
        font-size: 12px;
        padding: 0 5px;
    }
    .container-adaptive-font {
        --font-size: calc(var(--min-size) * 1px + (var(--max-size) - var(--min-size)) * (100cqw - var(--container-min) * 1px) / (var(--container-max) - var(--container-min)));
        font-size: clamp(var(--min-size) * 1px, var(--font-size), var(--max-size) * 1px);
    }
    .viewport-adaptive-font {
        --font-size: calc(var(--min-size) * 1px + (var(--max-size) - var(--min-size)) * (100vw - var(--viewport-min) * 1px) / (var(--viewport-max) - var(--viewport-min)));
        font-size: clamp(var(--min-size) * 1px, var(--font-size), var(--max-size) * 1px);
    }
</style>


## 前言

在开发响应式布局页面时，我们往往是针对几个屏幕断点来开发的；

在绝大多数时候，我们只有 pc 和移动设备这两种屏幕断点的设计图，在开发过程中就必须考虑这两种断点转换过程中字体大小应该怎么变化；

本文中展示的技术，让我们只需设置最大最小的字体值，就能实现字体大小的自动变化。

## 效果展示

调整浏览器窗口的大小以预览效果

### viewport

根据浏览器窗口大小改变字体大小

<div class="container-border" style="--viewport-min: 450; --viewport-max: 1200;">
    <div class="style-container">
        --viewport-min: 450;<br />
        --viewport-max: 1200;
    </div>
    <div class="container-border">
        <div class="style-container">
            --min-size: 16;<br />
            --max-size: 64;<br />
        	line-height: 1.3em;
        </div>
        <div
            class="viewport-adaptive-font"
            style="
                --min-size: 16;
                --max-size: 64;
            	line-height: 1.3em;
            "
     	>
        	Whereas recognition of the inherent dignity
        </div>
    </div>
    <div class="container-border">
        <div class="style-container">
            --min-size: 16;<br />
            --max-size: 48;<br />
            line-height: 1.3em;
        </div>
        <div
            class="viewport-adaptive-font"
            style="
                --min-size: 16;
                --max-size: 48;
               	line-height: 1.3em;
            "
    	>
            Whereas recognition of the inherent dignity
        </div>
    </div>
    <div class="container-border">
        <div class="style-container">
            --min-size: 12;<br />
            --max-size: 48;<br />
            line-height: 1.3em;
        </div>
        <div
			class="viewport-adaptive-font"
            style="
                --min-size: 12;
                --max-size: 48;
               	line-height: 1.3em;
            "
    	>
            Whereas recognition of the inherent dignity
        </div>
    </div>
</div>


### container

根据父元素 content 的宽度改变字体大小

<div class="container-border" style="--container-min: 300; --container-max: 600; --min-size: 12; --max-size: 48;">
    <div class="style-container">
        --container-min: 300;<br />
        --container-max: 600;<br />
        --min-size: 12;<br />
        --max-size: 48;
    </div>
    <div class="container-border container">
        <div class="container-border container-adaptive-font">
            Whereas recognition of the inherent dignity
        </div>
    </div>
    <div class="container-border container" style="max-width: 500px">
        <div class="style-container">
            max-width: 500px;
        </div>
        <div class="container-border container-adaptive-font">
            Whereas recognition of the inherent dignity
        </div>
    </div>
    <div class="container-border container" style="max-width: 400px">
        <div class="style-container">
            max-width: 400px;
        </div>
        <div class="container-border container-adaptive-font">
            Whereas recognition of the inherent dignity
        </div>
    </div>
</div>


## 代码 & 使用方式

引入下方的 CSS 代码：

```css
:root {
    --min-size: 16;
    --max-size: 16;
    --viewport-min: 320;
    --viewport-max: 2400;
    --container-min: 320;
    --container-max: 2400;
}
.container-adaptive-font {
    --font-size: calc(var(--min-size) * 1px + (var(--max-size) - var(--min-size)) * (100cqw - var(--container-min) * 1px) / (var(--container-max) - var(--container-min)));
    font-size: clamp(var(--min-size) * 1px, var(--font-size), var(--max-size) * 1px);
}
.viewport-adaptive-font {
    --font-size: calc(var(--min-size) * 1px + (var(--max-size) - var(--min-size)) * (100vw - var(--viewport-min) * 1px) / (var(--viewport-max) - var(--viewport-min)));
    font-size: clamp(var(--min-size) * 1px, var(--font-size), var(--max-size) * 1px);
}
```

在 HTML 中使用：

这里使用内联样式只是为了看上去更直观

### viewport

```html
<p class="viewport-adaptive-font" style="--min-size: 12; --max-size: 50; --viewport-min: 320; --viewport-max: 1000;">
    Whereas recognition of the inherent dignity
</p>
```

当浏览器窗口在 320px - 1000px 之间变化时，字体大小也会按照浏览器窗口变化的比例在 12px - 50px 之间变化；

当浏览器窗口的大小为 320px 时，达到最小字体大小 12px，此时浏览器窗口再变小字体大小也不会再改变了；

当浏览器窗口的大小为 1000px 时，达到最大字体大小 50px，此时浏览器窗口再变大字体大小也不会再改变了；

## container

```html
<div style="max-width: 400px; container-type: inline-size; box-sizing: content-box;">
    <div class="container-adaptive-font" style="--min-size: 12; --max-size: 28; --container-min: 320; --container-max: 600;">
        Whereas recognition of the inherent dignity
    </div>
</div>
```

(以下的父容器宽度皆为 `父容器 content 的宽度`)

当父容器宽度在 320px - 600px 之间变化时，字体大小也会按照父容器宽度变化的比例在 12px - 28px 之间变化；

当父容器宽度为 320px 时，达到最小字体大小 12px，此时父容器宽度再变小字体大小也不会再改变了；

当父容器宽度为 600px 时，达到最大字体大小 28px，此时父容器宽度再变大字体大小也不会再改变了；

注意：

- 这里指的父元素指的是，从设置了 `container-adaptive-font` Class 的元素开始，向上遇到的第一个设置了 `container-type: inline-size` 属性的父元素。
- 为了更方便的控制父容器的宽度，将父容器的 `box-sizing` 设置为 `content-box`
- 如果项设置 `line-height` 等属性时，使用 `em` 作为单位，让字体变化时着些属性也能跟着变化


## 实现

### clamp

通过 CSS 中的 `clamp()` 函数实现最大最小宽度的控制。

`clamp()` 函数的作用是把一个值限制在一个上限和下限之间，当这个值超过最小值和最大值的范围时，在最小值和最大值之间选择一个值使用。它接收三个参数：最小值、首选值、最大值。

### 容器查询

当容器设置 `container-type: inline-size;` 时，可以使用**容器查询长度单位**：

- `cqw`：查询容器宽度的 1%
- `cqh`：查询容器高度的 1%
- `cqi`：查询容器行向尺寸的 1%
- `cqb`：查询容器块尺寸的 1%
- `cqmin`：`cqi` 和 `cqb` 中较小的值
- `cqmax`：`cqi` 和 `cqb` 中较大的值

### 数值计算&单位转换

在《Responsive type scales with composable CSS utilities》文章中有具体的描述，这里就不再展开了


## 相关文章

> [Responsive type scales with composable CSS utilities | Tobias Ahlin --- 响应式类型使用可组合的 CSS 实用程序进行缩放 |托比亚斯·阿林](https://tobiasahlin.com/blog/responsive-fluid-css-type-scales/)

> [clamp() - CSS：层叠样式表 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clamp)

> [CSS 容器查询 - CSS：层叠样式表 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Container_Queries)

> [容器查询长度单位 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Container_Queries#容器查询长度单位)

> [讲解 CSS At Rules 容器查询 — @container - 掘金 (juejin.cn)](https://juejin.cn/post/7280847216658038821#heading-6)