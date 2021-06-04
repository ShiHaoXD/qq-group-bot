import dotenv from "dotenv"
import { createClient, GroupMessageEventData, MemberInfo } from "oicq"

import { canrepeatTimes } from "./config"
import Helper from "./Helper"
import { canRecall } from "./utils"

dotenv.config()

const groupID: number = parseInt(process.env.GROUP_ID!)

// const messages: GroupMessageEventData[] = []
const recentMessages: GroupMessageEventData[] = []
let groupMemberList: ReadonlyMap<number, MemberInfo> | null
const uin = parseInt(process.env.ACCOUNT!) // your account
const client = createClient(uin)

const helper = new Helper(client, groupID)

async function GroupMemberCardChanged() {
  const newGroupMemberList = (await client.getGroupMemberList(groupID, true)).data
  let change = false
  if (newGroupMemberList) {
    newGroupMemberList.forEach((value, key) => {
      const newInfo = value
      let oldInfo: MemberInfo
      if (groupMemberList?.has(key)) {
        oldInfo = groupMemberList?.get(key)!
      } else {
        return
      }
      if (newInfo.card !== oldInfo.card) {
        helper.sendMsg(`${oldInfo.card}(${oldInfo.user_id})将群昵称修改为${newInfo.card}`)
        change = true
      }
    })
    if (change) groupMemberList = newGroupMemberList
  }
  setTimeout(GroupMemberCardChanged, 3000)
}

//监听上线事件
client.on("system.online", async () => {
  console.log("Logged in!")
  // client.sendGroupMsg(groupID, "群机器人已开启")
  groupMemberList = (await client.getGroupMemberList(groupID)).data
  if (groupMemberList) {
    console.log("群成员获取成功")
    setTimeout(GroupMemberCardChanged, 3000)
  } else {
    console.log("群成员获取失败")
  }
})

//监听消息并回复
client.on("message.group", async data => {
  const {
    message_id,
    raw_message,
    group_id,
    sender: { role },
  } = data
  if (group_id === groupID) {
    if (canRecall(role)) {
      const result = await helper.recallKeywords(raw_message, message_id)
      if (result?.status === "ok") {
        return
      }
    }
    // messages.push(data)
    recentMessages.push(data)

    if (recentMessages.length > canrepeatTimes) {
      recentMessages.shift()
      helper.banForRepeat(recentMessages)
    }
    helper.replyKeyword(data.raw_message)
  }
})

// client.on("notice.group.recall", async data => {
//   let message: GroupMessageEventData | undefined
//   if (data.group_id === groupID) {
//     messages.some(item => {
//       if (item.message_id === data.message_id) {
//         message = item
//         return true
//       }
//     })
//     if (message) {
//       const operator = await client.getGroupMemberInfo(data.group_id, data.operator_id)
//       if (operator.status === "ok") {
//         helper.sendMsg(
//           `${operator.data.card}(${operator.data.user_id})撤回了${message.sender.card}(${message.sender.user_id})的一条消息：${message.raw_message}`,
//         )
//       }
//     }
//   }
// })

//监听滑动验证码事件并输入ticket
client.on("system.login.slider", function () {
  process.stdin.once("data", input => {
    this.sliderLogin(input as unknown as string)
  })
})

client.login(process.env.PASS_WORD) // your password or password_md5
