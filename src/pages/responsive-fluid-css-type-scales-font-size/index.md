---
title: '响应式布局 - 通过 CSS 实现无缝缩放字体大小'
date: '2023-11-24'
spoiler: ''
---

CSS 代码：

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

```html
<div style="container-type: inline-size;">
    <p class="container-adaptive-font" style="--min-size: 12; --max-size: 50; --container-min: 320; --container-max: 500;">
    	Whereas recognition of the inherent dignity
	</p>
</div>
```





<div class="container" style="width: 300px">
    <div class="style-container">
        container-type: inline-size;
    </div>
    <div class="container">
        <div class="style-container">
            --min-size: 12;<br />
            --max-size: 30;
        </div>
        <div class="container-adaptive-font" style="--min-size: 12; --max-size: 30">
            Whereas recognition of the inherent dignity
        </div>
    </div>
</div>
<div class="container">
    <div class="style-container">
        container-type: inline-size;
    </div>
    <div class="container">
        <div class="style-container">
            --min-size: 12;<br />
            --max-size: 30;
        </div>
        <div class="container-adaptive-font" style="--min-size: 12; --max-size: 30">
            Whereas recognition of the inherent dignity
        </div>
    </div>
    <div class="container">
		<div class="viewport-adaptive-font" style="--min-size: 12; --max-size: 50">Whereas recognition of the inherent dignity</div>
    </div>
</div>
<div style="margin-bottom: 100px"></div>
<style>
    :root {
        --min-size: 16;
    	--max-size: 16;
        --viewport-min: 320;
        --viewport-max: 2400;
        --container-min: 320;
        --container-max: 2400;
    }
    .container {
        padding: 10px;
        border: 1px dashed var(--textNormal);
        margin-top: 10px;
        container-type: inline-size;
        box-sizing: content-box;
    }
    .style-container {
        background-color: var(--textNormal);
        color: var(--bg);
        display: inline-block;
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





> [Responsive type scales with composable CSS utilities | Tobias Ahlin --- 响应式类型使用可组合的 CSS 实用程序进行缩放 |托比亚斯·阿林](https://tobiasahlin.com/blog/responsive-fluid-css-type-scales/)
