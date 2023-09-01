---
title: 'git reflog'
date: '2023-09-01'
spoiler: '使用 git 遇到代码丢失，reflog 成了我的救命稻草'
---

使用 `git reflog` 可以将你在 git 上面进行的操作都列出来：

![image-20230901131159016](assets/image-20230901131159016.png)

通过这些记录，可以将仓库恢复到执行完这一步操作后的状态：

```bash
git reset 42cf8f5 // 记录前的十六进制字符串
```
