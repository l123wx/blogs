---
title: '图标过渡动画'
date: '2024-01-02'
spoiler: '使用 Lottie 实现不同状态图标的过渡动画'
---

*2024新年快乐*

## 前言

在一些交互效果很好的网站 / APP 里，经常可以看到一些非常丝滑的图标过渡动画。

![example](assets/example.gif)

简单的看来，这个效果其实就是在切换图标之前，先播放一段动画，在动画结束后再显示新图标。而实现动画的播放有非常多的实现方式：

1. 切换的时候播放 GIF / 视频

   这种方式的好处是我们完全不需要管（也没办法管）动画的实现，直接使用设计同事给我们的素材就行了；缺点也是这一点，我们无法（比较难）控制播放的进度、速度和播放方向等细节，也无法（比较难）读取当前动画的播放情况 —— 动画什么时候播放结束。这个问题虽然可以通过定时器之类的方式来实现，但是这样需要针对每个动画都定义一个持续时间的变量，当素材出现变化时，需要跟着修改这个时间，想想就让人头大

2. [使用 CSS3 的 Animation 实现 GIF 动画效果](/css-animation-steps)

   这种方式跟第一种方式类似，但是我们可以通过修改 CSS3 Animation 的属性来控制动画的播放细节了

3. 使用 GSAP 之类的动画库实现，可以通过 CSS 控制单张雪碧图展示区域的方式，也可以控制多张图片素材显隐的方式

   

4. 使用 Lottie 播放 AE 导出的动画文件


## 相关文章

> [如何在 After Effects 中设置 Named Markers (lottiefiles.com)](https://lottiefiles.com/blog/tips-and-tutorials/how-to-setup-named-markers-in-lottie-animations)

> [Web (airbnb.io)](https://airbnb.io/lottie/#/web)

> [After Effects (airbnb.io)](https://airbnb.io/lottie/#/after-effects)
