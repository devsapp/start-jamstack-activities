# 创意活动Jamsatck站点 
## 前置条件
+ 配置好阿里云的秘钥信息
+ 开通tablestore 并创建一个实例， phone 为主键， 列为 name,desc,addr 都为字符串
## 快速开始
```
s init start-jamstack-activities

```

输入项目名<porjectName>，输入自定义二级域名,输入 进入 <projectName> 目录，输入 tablestore 的公网链接，输入tablestore 的实例名
执行
```
s deploy
```
访问返回的 <自定义域名>.resume.net.cn </br>



## 目录结构说明

+ -- qa  // 纯静态站点文件，内容为h5效果的动画
+ -- qa-api // 用来保存数据的接口 api

## 配置说明
### 配置基本信息包含 vars 下面的三个变量
+ domain: <xxx>  // 域名信息,必填

### 两个服务
+  管理发布api
+ cloudnativeQA 静态站点服务
+ qa-api api服务

服务可以进行全量部署，会自动解析相关的依赖，也可以独立部署

## 其他
源码部分附加了 h5的源文件，本身h5动画是用hype 低代码软件搭建的，需要下载相应的软件才能打开修改
