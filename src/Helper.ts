import { Client, MessageElem } from "oicq"

import { replyKeywords, recallKeywords } from "./config"

export default class Helper {
  client: Client
  groupID: number

  constructor(client: Client, groupID: number) {
    this.client = client
    this.groupID = groupID
  }
  sendMsg(msg: string | MessageElem | Iterable<MessageElem>) {
    return this.client.sendGroupMsg(this.groupID, msg)
  }

  deleteMsg(msgID: string) {
    return this.client.deleteMsg(msgID)
  }

  replyKeyword(raw_message: string) {
    replyKeywords.forEach(keyword => {
      const regex =
        typeof keyword.keyword === "string" ? new RegExp(`^${keyword.keyword}$`) : keyword.keyword
      if (regex.test(raw_message)) {
        if (typeof keyword.reply === "string") {
          this.sendMsg(keyword.reply)
        } else {
          this.sendMsg(keyword.reply())
        }
      }
    })
  }

  recallKeywords(raw_message: string, msgID: string) {
    if (
      recallKeywords.some(e => {
        const regex = typeof e === "string" ? new RegExp(`\S*${e}\S*`) : e
        return regex.test(raw_message)
      })
    ) {
      return this.deleteMsg(msgID)
    }
  }
}
