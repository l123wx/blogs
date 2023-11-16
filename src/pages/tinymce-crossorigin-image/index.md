---
title: 'TinyMCE 外部图片链接无法展示的问题'
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

在 Tinymce 的 initOptions 中添加：

```js
...,
// 允许 img 标签的所有属性，不添加这行代码的话 Tinymce 会自动删除我们要添加的 referrerPolicy 属性
// 如果已经设置过其他属性，使用逗号隔开，eg: '*[style], img[*]'
extended_valid_elements: 'img[*]',
// 这个回调会在粘贴内容到 Tinymce 时触发，可以在这个内容修改粘贴的内容。
// 我们在这里去除导致跨域的 crossorigin 属性，添加 referrerPolicy="no-referrer"
paste_preprocess: function (_, args) {
    args.content = args.content
        .replaceAll('crossorigin', '')
        .replaceAll('<img', '<img referrerPolicy="no-referrer"')
},
...
```

