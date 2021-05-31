import { createClient, GroupMessageEventData } from "oicq"
import dotenv from "dotenv"
dotenv.config()

const groupID: number = process.env.GROUP_ID as unknown as number

const messages: GroupMessageEventData[] = []
const uin = process.env.ACCOUNT as unknown as number // your account
const client = createClient(uin)

//监听上线事件
client.on("system.online", async () => {
  console.log("Logged in!")
})

//监听消息并回复
client.on("message.group", data => {
  if (data.group_id === groupID) {
    messages.push(data)
  }
})

client.on("notice.group.recall", async data => {
  let message: GroupMessageEventData | undefined
  if (data.group_id === groupID) {
    messages.some(item => {
      if (item.message_id === data.message_id) {
        message = item
        return true
      }
    })
    if (message) {
      const operator = await client.getGroupMemberInfo(data.group_id, data.operator_id)
      if (operator.status === "ok") {
        client.sendGroupMsg(
          data.group_id,
          `${operator.data.card}(${operator.data.user_id})撤回了${message.sender.card}(${message.sender.user_id})的一条消息：${message.raw_message}`,
        )
      }
    }
  }
})

//监听滑动验证码事件并输入ticket
client.on("system.login.slider", function () {
  process.stdin.once("data", input => {
    this.sliderLogin(input as unknown as string)
  })
})

client.login(process.env.PASS_WORD) // your password or password_md5
