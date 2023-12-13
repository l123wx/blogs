---
title: '使用 Github Pages 出现资源404的问题'
date: '2023-12-13'
spoiler: ''
---

使用 Github Pages 时，如果出现在本地起 Http 服务项目正常，但是上传到 Github Pages 时，出现部分资源404的情况，可能是因为 Jekyll 将名字以下划线开头的文件忽略了。



要解决这个问题，我们可以在项目根路径添加名为 `.nojekyll` 的文件，这样就会绕过 GitHub Pages 上的 Jekyll 处理。


## 相关文章

> [Bypassing Jekyll on GitHub Pages - The GitHub Blog](https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/)