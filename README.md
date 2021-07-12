# qq 群机器人

基于[oicq 框架](https://github.com/takayama-lily/oicq)开发

## 🎉 特性

- 关键字回复
  - 吃什么/什么没吃过
  - 二维码
- 关键字撤回
- 天气预报
- 复读禁言
- 查看热搜 / 一觉醒来发生了什么
- 出校申请/立即出校
- 掌上重邮定时签到
- 教务在线新闻
- 每日健康打卡

## 使用

1. 首先在根目录新建 `.env` 文件

   ```tex
   ACCOUNT = 123456 # 机器人的 QQ 号，该 QQ 号不可以使用机器人功能！
   PASS_WORD = 'password' # 密码
   GROUP_ID = 123456 # QQ 群号
   ```

2. 在`src/plugins/index.ts`文件选择你需要的插件（取消导入插件的注释即可），插件目录下有配置文件，需自己修改`config.example.ts`，如果需要上传`GitHub`等网站，可将配置文件修改命名为`config.private.ts`，并将该插件目录下的其余文件中的`example`关键字全部改为`private`（使用全局替换）

3. 配置好后，执行安装命令

   ```shell
   yarn

   yarn start

   # 或者使用 npm

   npm i

   npm start
   ```
