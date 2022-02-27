![qq-group-bot](https://socialify.git.ci/Cansiny0320/qq-group-bot/image?description=1&descriptionEditable=%F0%9F%A4%96%20%E4%B8%80%E6%AC%BE%E6%8F%92%E4%BB%B6%E5%8C%96%E7%9A%84%20qq%20%E7%BE%A4%E6%9C%BA%E5%99%A8%E4%BA%BA%20%E4%B8%BB%E8%A6%81%E7%94%A8%E4%BA%8E%E9%87%8D%E5%BA%86%E9%82%AE%E7%94%B5%E5%A4%A7%E5%AD%A6(CQUPT)&font=Inter&logo=https%3A%2F%2Fcansiny.oss-cn-shanghai.aliyuncs.com%2Fimages%2F%25E6%259C%25BA%25E5%2599%25A8%25E4%25BA%25BA.png&owner=1&pattern=Charlie%20Brown&stargazers=1&theme=Light)

## 🎉 插件

### 通用插件

- 关键字回复
  - 吃什么/什么没吃过
  - 二维码
- 关键字撤回
- 天气预报（提醒是否有雨）
- 复读禁言
- 查看热搜 / 每日播报一觉醒来发生了什么

### we 重邮相关插件

- 出校申请
- 一键离返校
- 每日健康打卡

### 掌上重邮相关插件

- 掌上重邮每日签到
- 教务在线新闻通知

## 使用

> 首先应该知道的是，机器人会占用一个 QQ 号

1. 配置环境
   
   在根目录新建 `.env` 文件，内容如下：（删除注释）

   ```tex
   ACCOUNT = 123456 # 机器人的 QQ 号
   PASS_WORD = 'password' # 密码
   GROUP_ID = 123456 # QQ 群号
   ```

2. 使用插件

   插件列表在`src/plugins`目录下，使用方式为在`src/index.ts`导入插件后使用`bot.use`安装插件，例如

   ```ts
   import {weCqupt} from './plugins/weCqupt';

   bot.use(weCqupt)
   ```
   注意：某些插件目录下有配置文件，需自己按照`config.example.ts`中的内容，创建`config.private.ts`文件修改配置

3. 启动
   
   配置好后，执行安装命令，并启动机器人

   ```shell
   yarn

   yarn start

   # 或者使用 npm

   npm i

   npm run start
   ```

   查看 log

   ```shell
   yarn run log
   ```

4. 测试
   
   如机器人正常启动，则会自动在群聊发送“bot 启动成功”
