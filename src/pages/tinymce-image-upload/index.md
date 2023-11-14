---
title: 'TinyMCE 开启图片、视频和附件上传等功能'
date: '2023-11-14'
spoiler: '图片！视频！附件！'
---

## 前言

本文主要讲述如何开启 TinyMCE 富文本的图片、视频和附件上传功能，关于 TinyMCE 的安装，可以阅读 [官方文档](https://www.tiny.cloud/docs/tinymce/6/installation/) 的安装教程。如需使用离线版本的 TinyMCE，可以查看这篇文章： [《Vue3 使用离线版的 TinyMCE》](/tinymce-self-hosted)

## 开始

### 图片上传

```javascript
const initOptions = {
    // 添加 image 插件
    plugins: 'image ...',
    // 避免图片地址和链接地址被 TinyMCE 转换成相对路径
    relative_urls: false,
    // 开启高级设置面板
    image_advtab: true,
    // 开启图片上传面板
    image_uploadtab: true,
    // 图片上传地址
    images_upload_url: `upload_url`,
    // 是否限制用户只能按比例调整大小
    resize_img_proportional: false,
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

tinymce.init(initOptions)
```

注意：需要同时开启 `image_uploadtab` 和 填写 `image_upload_url` 才会展示图片上传面板，所以就算使用自定义上传方法，也要填写 `image_upload_url` 字段

### 视频上传

```js
const initOptions = {
    // 添加 media 插件
    plugins: 'media ...',
    // 设置在 media 弹窗添加本地文件上传按钮，见（图1）
    file_picker_types: 'media',
    // 点击上传按钮触发的回调
    file_picker_callback: callback => {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        // 设置可以选择的文件类型
        input.setAttribute('accept', '.mp3, .mp4')
        // 手动触发文件选择 input
        input.click()
        input.onchange = function () {
            var file = this.files[0]
            /**
             *  eg: 文件上传，callback 的参数为文件的 URL
             *	uploadFile(file, file.name)
             *  	.then(res => {
             *      	callback(res.fileName)
             *  	})
             *  	.catch(err => {})
             */
        }
    },
    // 控制 video 标签的属性
   	video_template_callback: data => {
        return `
            <video
                width="${data.width}"
                height="${data.height}"
                controls="controls"
                ${data.poster ? `poster="${data.poster}"` : ''}
            >
                <source
                    src="${data.source}"
                    ${data.sourcemime ? `type="${data.sourcemime}"` : ''}
                />
                ${data.altsource ?
                    `<source
                            src="${data.altsource}"
                            ${data.altsourcemime ? `type="${data.altsourcemime}"`: ''}
                        />` : ''
                }
            </video>
        `
    },
    ...
}

tinymce.init(initOptions)
```

<img src="assets/image-20231114173359987.png" alt="image-20231114173359987" style="zoom:80%;" />

<div style="text-align: center; font-size: 14px; color: #888888">图1</div>

### 附件上传

由于使用了非 TinyMCE 自带的插件，所以需要下载对应的插件文件：[Github](https://github.com/Five-great/tinymce-plugins)

也可以在这里[下载](./assets/attachment.zip)，这个版本我微调了一下图标的样式，无需再修改 CSS 文件

下载完成后解压放到 TinyMCE 目录下的 plugins 文件夹里，eg：/js/tinymce/plugins/

```js
const initOptions = {
    // 添加 attachment 插件
    plugins: 'attachment ...',
    // 这个插件不会自动添加到菜单栏，所以要手动添加
    menu: {
        insert: {
            title: '插入',
            items: '... attachment ...'
        }
    },
    ...
    attachment_upload_handler: (
        // 选择的文件
        file,
        // 成功的回调，参数为文件的 URL
        successCallback,
        // 失败的回调，参数为错误提示的内容
        failureCallback,
        // 进度的回调
        progressCallback
    ) => {
        // eg: 上传文件到服务器
        uploadFile(file, file.name, e => {
            progressCallback((e.loaded / e.total) * 100 + '%')
        })
            .then(res => {
            successCallback(res.fileName)
        })
            .catch(err => {
            failureCallback(`上传失败:${err.message}`)
        })
    },
    ...
}

tinymce.init(initOptions)
```

### 粘贴外部复制的文章内容时，保留 style 属性

```js
const initOptions = {
    ...
    // 粘贴时是否去除 style
    paste_remove_styles_if_webkit: false,
    // 允许所有标签的 style 属性
    valid_elements: '*[style]',
    ...
}

tinymce.init(initOptions)
```

### 更多

- 插入源代码功能：使用自带的 code 插件

- 分割线功能：使用自带的 hr 插件
- 表格：使用自带的 table 插件

附：

供参考的插件和菜单配置

```js
const initOptions = {
    ...
    // attachment layout 是外部插件，layout 是一键排版的插件，但是感觉不是很好用，所以就不在这里介绍了
    plugins: 'link image table lists media preview code attachment layout',
    toolbar: 'undo redo | formatselect fontsizeselect bold italic underline forecolor backcolor alignleft aligncenter alignright alignjustify outdent indent image media attachment table',
    menu: {
        insert: {
            title: '插入',
            items: 'image link media attachment inserttable | hr'
        },
        tools: {
            title: '工具',
            items: 'code layout'
        }
    },
    font_size_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt 48pt',
    ...
}

tinymce.init(initOptions)
```

