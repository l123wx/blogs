---
title: 'Vue 在 keep-alive 页面使用 Tinymce 的 bug'
date: '2024-03-01'
spoiler: ''
---

## 问题描述

在 Vue 中使用 Tinymce 时，如果给页面添加了 keep-alive，当页面被切到后台再重新被唤醒后，Tinymce 的内容会消失，而且也不能再编辑

## 解决方案

在页面失效时将富文本组件销毁，页面被唤醒时重新初始化

1. 通过调用 Tinymce 的销毁方法实现

```vue
<script setup>
	import { onActivated, onDeactivated } from 'vue'
    
    ...
    
    onActivated(async () => {
    	initTinyMCE(initOptions);
    })

    onDeactivated(() => {
      	tinyMCEEditor.destroy()
    })
</script>
```

2. 在使用富文本组件时，通过 v-if 让组件重新渲染

   ```vue
   <template>
   	<TinymceEditor v-if="isActive" />
   </template>
   
   <script setup>
   	import { onActivated, onDeactivated, ref } from 'vue'
       
       const isActive = ref(true)
       
       ...
       
       onActivated(async () => {
       	isActive.value = true
       })
   
       onDeactivated(() => {
         	isActive.value = false
       })
   </script>
   ```
