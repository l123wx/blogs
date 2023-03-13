---
title: 'vue-router使用history模式出现404的问题'
date: '2023-03-13'
spoiler: 'Nginx 的 try_files 配置'
---

在使用 vue-router 的 history 模式时，会遇到刷新页面 404 的情况。导致这种情况的原因是，Nginx 面对 `https://example/testPath` 这种路径时，会将后面的 `testPath` 当成是文件去检索，在没有检测到这个文件的时候就直接返回 404 了。为了解决这个问题，可以在 Nginx 的 config 文件中配置 `try_files`

```perl
server {
	location / {
        try_files $uri $uri/ /index.html;
    }
}
```
