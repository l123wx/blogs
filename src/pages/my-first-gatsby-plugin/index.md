---
title: '我的第一个 Gatsby 插件'
date: '2023-02-02'
spoiler: '开发一个自己的 Markdown 解析插件，并上传到 npm'
isPending: true
---

## 前言

在写文章时，发现之前使用的 Markdown 代码高亮插件  `gatsby-remark-prismjs`  不能解析 vue.js 的代码，而且也没有提供拓展语言的方法。一番探寻无果后，想到 vue.js 官网的解析肯定支持的很好呀，参考一下他们是怎么做的不就好了。

## 如何编写插件

### 在此之前

[Creating Plugins | Gatsby (gatsbyjs.com)](https://www.gatsbyjs.com/docs/creating-plugins/)

#### gatsby插件使用方法

#### gatsby插件类别

#### gatsby-transformer-remark

[gatsby-transformer-remark | Gatsby (gatsbyjs.com)](https://www.gatsbyjs.com/plugins/gatsby-transformer-remark)

### 开始

#### gatsby-transformer-remark类插件基础开发

[Creating a Remark Transformer Plugin | Gatsby (gatsbyjs.com)](https://www.gatsbyjs.com/tutorial/remark-plugin-tutorial/)

#### 如何调试

### 进阶

当项目文件变多之后变复杂之后：

#### babel

babel-preset-gatsby-package

markdownAST

#### typescript

@babel/preset-typescript

```ts
import type { Root, Code, InlineCode } from 'mdast'
```

### 发布插件

[Submit to Plugin Library | Gatsby (gatsbyjs.com)](https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/submit-to-plugin-library/)

## 上传到npm

### 怎么做

[Contributing packages to the registry | npm Docs (npmjs.com)](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

#### 必要的准备

#### 一切准备就绪后

[Creating and publishing unscoped public packages | npm Docs (npmjs.com)](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages)

```shell
// 登录注册
npm adduser
// 上传插件
npm publish --access public
```

