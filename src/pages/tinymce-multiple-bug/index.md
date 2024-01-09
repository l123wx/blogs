---
title: '同一页面中使用多个 TinyMCE 富文本框的坑'
date: '2024-01-09'
spoiler: '记录一个之前解决的问题'
---

## 1. textarea 标签 id 重复

在初始化 TinyMCE 时需要配置 textarea 的 selector，这里容易出现的一个问题就是直接将 textarea 的 id 写成固定值了，当同一个页面多次使用这个组件的时候，就会出现 id 重复的情况，导致只有一个富文本框能正常使用的问题

解决方法很简单，每次组件加载的时候动态设置textarea 标签的 id 就行了：

```vue
<template>
	<textarea :id="TINY_MCE_ID"></textarea>
</template>


<script setup>
    const TINY_MCE_ID = "editor_" + Date.now()
    
    ...
    window.tinyMCE.init({
        selector: '#' + TINY_MCE_ID
    })
    ...
</script>
```

## 2. 通过 cdn 或者本地资源方式使用时 onload 的回调问题

通过这两种方式使用时，我们需要通过 script 标签加载 js 代码：

```vue
<!-- TinyMCE.vue -->

<script setup>
    let tinyMCEEditor
    
	onMounted(() => {
        const script = document.createElement('script')
        script.src = BASE_URL + '/tinymce.min.js'
        script.onload = async () => {
            // 初始化 TinyMCE 并保存返回的 Editor 对象
            ;[tinyMCEEditor] = await window.tinyMCE.init(initOptions)
        }
        document.body.appendChild(script)
    })
</script>
```

当同一个页面多次使用这个组件时，由于已经存在这个 script 标签了，并且 tinymce.min.js 已经加载过了，所以 script 标签的 onload 方法不会再回调了

我们可以编写一个 Hook 统一执行 TinyMCE 资源的加载

### UseTinyMCE Hook

```js
// useTinyMCE.ts

import { RawEditorOptions, Editor } from '../../public/tinyMCE/tinymce'

let isScriptLoading = false
const initMethodList: Array<() => Promise<void>> = []

const isTinyMCENotReadyToInit = () =>
    isScriptLoading === true || !window.tinyMCE
const isBeforeTinyMCEInit = () => isScriptLoading === false && !window.tinyMCE

const useTinyMCE = () => {
    const init = (initOptions: RawEditorOptions) => {
        return new Promise<Editor[]>(async resolve => {
            const initMethod = async () =>
                resolve(await window.tinyMCE.init(initOptions))

            if (isTinyMCENotReadyToInit()) {
                initMethodList.push(initMethod)
            } else {
                initMethod()
            }

            if (isBeforeTinyMCEInit()) {
                isScriptLoading = true
                const script = document.createElement('script')
                script.src = '/tinyMCE/tinymce.min.js'
                script.onload = async () => {
                    isScriptLoading = false
                    while (initMethodList.length) {
                        initMethodList[0]()
                        initMethodList.splice(0, 1)
                    }
                }
                document.body.appendChild(script)
            }
        })
    }

    return {
        init
    }
}

export default useTinyMCE

```

在组件中使用

```vue
<script setup>
	import useTinyMCE from 'examplePath/useTinyMCE'

    const { init: initTinyMCE } = useTinyMCE()
    
    const initOptions = {...}
    let tinyMCEEditor

    onMounted(async () => {
        [tinyMCEEditor] = await initTinyMCE(initOptions)
    })
</script>
```
