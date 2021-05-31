import { Client, MessageElem } from "oicq"

import { keywords } from "./config"

export default class Helper {
  client: Client
  groupID: number
  constructor(client: Client, groupID: number) {
    this.client = client
    this.groupID = groupID
  }
  sendMsg(msg: string | MessageElem | Iterable<MessageElem>) {
    this.client.sendGroupMsg(this.groupID, msg)
  }

  replyKeyword(raw_message: string) {
    keywords.forEach(keyword => {
      if (keyword.regex.test(raw_message)) {
        if (typeof keyword.reply === "string") {
          this.sendMsg(keyword.reply)
        } else {
          this.sendMsg(keyword.reply())
        }
      }
    })
  }
}
