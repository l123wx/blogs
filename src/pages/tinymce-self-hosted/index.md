---
title: 'Vue3 使用离线版的 TinyMCE'
date: '2023-03-21'
---

## 前言

出于以下原因，我们可能需要使用离线版的 TinyMCE：

 - 内网部署，无法访问外部资源
 - 希望通过直接访问本地资源优化加载速度
 - 不想使用 api-key

本文中以 Vue3 项目为例，使用离线版本的 TinyMCE

## 操作步骤

### 资源准备

在 TinyMCE [官网下载](https://www.tiny.cloud/get-tiny/self-hosted/) 代码包，如果没有查看源码的需求，可以直接下载 Prod 版本

![image-20230321171526780](./assets/image-20230321171526780.png)

将下载的代码包解压移动到项目的 `/public` 目录下，如果需要添加语言包的话，添加到 `langs` 文件夹中

![image-20230321175710412](./assets/image-20230321175710412.png)

### 编写代码

新建一个 Editor 组件

```vue
<!-- Editor.vue -->
<template>
    <textarea id="editor"></textarea>
</template>

<script setup lang="ts">
    import { RawEditorOptions, Editor } from 'public/js/tinymce/tinymce'

    const initOptions: RawEditorOptions = {
        selector: 'textarea#editor',
        language: 'zh-Hans',
        language_url: '/js/tinymce/langs/zh-Hans.js',
        // 静态资源文件路径
        base_url: '/js/tinymce',
        // 我们引入的是 tinymce.min.js，需要使用 suffix 添加 .min 后缀
        suffix: '.min',
        init_instance_callback: () => {
            // 在初始化完成后触发
        },
        ...
    }

    let tinymceEditor: Editor

    onMounted(() => {
        const script = document.createElement('script')
        script.src = '/js/tinymce/tinymce.min.js'
        script.onload = async () => {
            // 初始化 TinyMCE 并保存返回的 Editor 对象
            ;[tinymceEditor] = await window.tinymce.init(initOptions)
        }
        document.body.appendChild(script)
    })
</script>
```

在页面中使用

```vue
<template>
    <Editor />
</template>

<script setup lang="ts">
    import Editor from 'examplePath/Editor.vue'
</script>
```

运行项目，可以看到所有资源都是请求的本地资源

![image-20230321181804079](./assets/image-20230321181804079.png)

### TypeScript

如果使用 `TypeScript` 的话，还需要对类型进行配置

首先在 `tsconfig.json` 文件中加入 TinyMCE 的类型文件：

```json
{
    "include": [
        "public/js/tinymce/tinymce.d.ts"
    ]
}
```

在 `/src` 目录下添加 `window.d.ts` 文件，添加如下代码：

```typescript
import { TinyMCE } from 'public/js/tinymce/tinymce'

declare global {
    interface Window {
        tinymce: TinyMCE
    }
}
```

这段代码会在 `window` 对象上添加 `tinymce` 属性
