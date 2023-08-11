---
title: '渐变高斯模糊'
date: '2023-08-11'
---

```css{29,30}
* {
    margin: 0
}

body {
    height: 100vh;
    background-image: url("https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2600&q=80");
    background-size: cover;

    &:before {
        content: 'Hover me!';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 15vh;
        color: #ffffff99;
        font: 10vw arial;
        text-align: center;
    }

    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        backdrop-filter: blur(20px);
        mask: linear-gradient(transparent, black 60%);
        transition: 1s;
    }
    
    &:hover:after {
        opacity: 1;
    }
}
```



效果图：

![image-20230811094457089](assets/image-20230811094457089.png)
