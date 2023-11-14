---
title: 'Tinymce 外部图片跨域问题'
date: '2023-11-14'
spoiler: 'HTML 中，外部的图片链接粘贴进去展示不出来，主要是两个原因：1. 跨域 2. 防盗链...'
---

HTML 中，外部的图片链接粘贴进去展示不出来，主要是两个原因：

1. 跨域
2. 防盗链

## 跨域

删除标签中的 `crossorigin` 属性

## 防盗链

通过给 `img` 标签添加 `referrerPolicy="no-referrer"` 解决

## Tinymce 代码

在 Tinymce 的 initOptions 的 `paste_postprocess` 回调中处理：

[`paste_postprocess`](https://www.tiny.cloud/docs/tinymce/6/copy-and-paste/#paste_postprocess) 回调会在粘贴内容到 Tinymce，并且已经将粘贴的内容转换成 DOM 后触发，可以通过 `args.node` 获取到 DOM

```js
...,
paste_postprocess: function (editor, args) {
    args.node.querySelectorAll('img').forEach(element => {
        element.removeAttribute('crossorigin')
        element.setAttribute('referrerPolicy', 'no-referrer')
    })
},
...
```

这段代码只能让 Tinymce 在编辑的时候可以看到图片，当使用 getContent 方法获取 html 内容的时候，referrerPolicy 属性还是会被移除，所以还要再 getContent 获取内容后对 img 标签进行处理：

```js{5}
const getContent = () => {
    return (
        this.tinymceEditor?.getContent({
            format: 'html'
        }).replaceAll('<img', '<img referrerPolicy="no-referrer"') || ''
    )
}
```

