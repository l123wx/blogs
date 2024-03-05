---
title: 'Linux crontab 定时任务没有日志的问题'
date: '2024-03-05'
spoiler: '定时任务突然不执行了，我来看看是怎么个事'
---

一直以来都用 crontab 跑定时任务将 n1 盒子的 ipv6 地址同步到域名 DNS 解析记录上，但是这两天突然发现定时任务不执行了，想看看 crontab 的日志，但是发现网上说的路径下并没有日志，原来 Ubuntu 默认是不开启 crontab 日志的

## 打开crontab日志

编辑以下文件

```Bash
vi /etc/rsyslog.d/50-default.conf
```

将cron前面的注释符去掉

```bash
cron.* /var/log/cron.log
```

重启 rsyslog

```bash
service rsyslog restart
```

现在就能看到 crontab 的日志了

```bash
less /var/log/cron.log
```

发现这里只有执行记录，并没有详细的日志

```
Mar 5 20:40:20 armbian CRON[1748]: (elvis) CMD (node /root/update_ipv6_address_to_namesilo.js)
Mar 5 20:40:20 armbian CRON[1745]: (CRON) info (No MTA installed, discarding output)
```

## 安装邮件管理服务

在 crontab 的日志中有这样一行记录：`CRON[1745]: (CRON) info (No MTA installed, discarding output)` ，这意味着你没有安装邮件管理服务，而 crontab 每次执行完任务，输出信息是通过电子邮件的方式发给当前用户的，所以我们需要安装邮件管理服务：

```bash
apt-get install postfix
service postfix start
```

然后就可以在对应用户的邮件目录看到日志了

```bash
/var/mail/<user>
```
