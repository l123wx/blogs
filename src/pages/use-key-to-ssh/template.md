---
title: '使用密钥 SSH 连接远程终端'
date: '2024-05-27'
spoiler: '简介'
---

假设现在 终端 C（Client）要通过 ssh 连接 终端 S（Server）

（以下举例的路径是 windows 系统的，其他系统需要按照实际情况调整）

## 正常流程

1. 在 终端 C 使用 `ssh-keygen` 生成一对私钥和公钥，例如：`id_rsa` 和 `id_rsa.pub`

2. 将 终端 C 公钥 `id_rsa.pub` 的内容复制到 终端 S 的 `~/.ssh/authorized_keys` 文件中。如果是管理员账号登录，复制到 `\_\_PROGRAMDATA__/ssh/administrators_authorized_keys` 文件中

3. 在终端 C 中使用 ssh 连接 终端 S
    ```shell
    ssh -i ~/.ssh/id_rsa exampleUser@exampleSite -p examplePort
    ```

## 常见问题&解决方案

<details>
<p>

### 连接失败或提示 Connection refused

检查下面的地方：

1. 两台机器之间网络是否连通

2. 终端 S 的 sshd 服务是否启动

3. 终端 S 的防火墙是否开放对应端口

### 使用公私钥连接但是一直提示使用密码登录

首先检查终端 S 的 sshd 配置（`\_\_PROGRAMDATA__/ssh/sshd_config`）是否开启了使用公钥登录

```
PubkeyAuthentication yes
```

修改之后重启 sshd 服务

如果开启后还是不行，可能是 [文件权限问题](#文件的权限问题)

### 文件权限问题

对于终端 S 来说，要检查 `authorized_keys` 和 `administrators_authorized_keys` 两个文件的权限

对于终端 C 来说，要检查使用的私钥（如这里的 `id_rsa`）文件的权限

在 linux，可以使用 `chmod` 修改权限；

在 windows 中，在 `右键 > 属性 > 安全 > 高级` 中修改权限。终端 C 证书的权限设置比较特殊： 首先禁用继承，然后将除了当前用户的其他用户都删掉，否则 ssh 会因为该证书的所有者不止一个拒绝使用这个证书

</p>
</details> 

## 查看日志

**最快速定位问题的方式还是直接看日志**

终端 C:

在使用 ssh 命令时添加 `-v`，可以查看连接的具体日志

```shell
ssh example.com -v
```

终端 S:

修改 `sshd_config` 文件

```
SyslogFacility LOCAL0
LogLevel Debug3
```

修改后需要重启 sshd 服务

日志文件默认在 `\_\_PROGRAMDATA__/ssh/log` 目录下