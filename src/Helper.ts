import {Client, GroupMessageEventData, MessageElem} from 'oicq';

import {recallKeywords, replyKeywords} from './config';
import {isPromise} from './shared';

export default class Helper {
  client: Client;
  groupID: number;

  constructor(client: Client, groupID: number) {
    this.client = client;
    this.groupID = groupID;
  }
  sendMsg(msg: string | MessageElem | Iterable<MessageElem>) {
    return this.client.sendGroupMsg(this.groupID, msg);
  }

  deleteMsg(msgID: string) {
    return this.client.deleteMsg(msgID);
  }

  banMember(userId: number, duration: number) {
    return this.client.setGroupBan(this.groupID, userId, duration);
  }

  banForRepeat(recentMessages: GroupMessageEventData[]) {
    recentMessages = recentMessages.map(e => {
      if (e.raw_message.startsWith('[CQ:')) {
        e.raw_message = e.raw_message.split(',')[1];
      }
      return e;
    });
    const raw = recentMessages[0].raw_message;
    if (recentMessages.every(e => e.raw_message === raw)) {
      const banTime = Math.ceil(Math.random() * 5) * 60;
      this.banMember(
        recentMessages[recentMessages.length - 1].user_id,
        banTime
      );
    }
  }

  replyKeyword(raw_message: string) {
    replyKeywords.forEach(async e => {
      const regex =
        typeof e.keyword === 'string'
          ? new RegExp(`^${e.keyword}$`)
          : e.keyword;
      if (regex.test(raw_message)) {
        if (typeof e.reply === 'string') {
          this.sendMsg(e.reply);
        } else if (e.interactive) {
          const str = raw_message.split(' ').slice(1).join(' ');
          this.sendMsg((await e.reply(str)) as string);
        } else {
          const result = e.reply();
          isPromise(result) ? this.sendMsg(await result) : this.sendMsg(result);
        }
      }
    });
  }

  recallKeywords(raw_message: string, msgID: string) {
    if (
      recallKeywords.some(e => {
        const regex = typeof e === 'string' ? new RegExp(`\\S*${e}\\S*`) : e;
        return regex.test(raw_message);
      })
    ) {
      return this.deleteMsg(msgID);
    }
  }
}
