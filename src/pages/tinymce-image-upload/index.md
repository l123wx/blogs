---
title: 'TinyMCE 开启图片上传功能'
date: '2023-03-22'
---

## 前言

本文主要讲述如何开启 TinyMCE 富文本的本地图片上传功能，关于 TinyMCE 的安装，可以阅读 [官方文档](https://www.tiny.cloud/docs/tinymce/6/installation/) 的安装教程。如需使用离线版本的 TinyMCE，可以查看这篇文章： [《Vue3 使用离线版的 TinyMCE》](/tinymce-self-hosted)

## 开始

### 配置

```javascript

const initOptions = {
    // 开启高级设置面板
    image_advtab: true,
    // 开启图片上传面板
    image_uploadtab: true,
    // 图片上传地址
    images_upload_url: `upload_url`,
    // 自定义上传方法
    images_upload_handler: async (blobInfo, progress) => {
        const formData = new FormData()
        formData.append('file', blobInfo.blob(), blobInfo.filename())

        // 图片上传请求
        const { resultPath } = await exampleUpload(formData)

        // 可以通过 progress 方法设置图片上传进度
        // xhr.upload.onprogress = e => {
        //     progress (( e.loaded / e.total ) * 100 )
        // }

        return resultPath
    }
}
```

注意：需要同时开启 `image_uploadtab` 和 填写 `image_upload_url` 才会展示图片上传面板，所以就算使用自定义上传方法，也要填写 `image_upload_url` 字段
