import {Client, MessageElem} from 'oicq';

export default class Helper {
  readonly client: Client;
  readonly groupID: number;

  constructor(client: Client, groupID: number) {
    this.client = client;
    this.groupID = groupID;
  }
  sendMsg(msg: string | MessageElem | Iterable<MessageElem>) {
    return this.client.sendGroupMsg(this.groupID, msg);
  }

  sendPrivateMsg(
    receiverID: number,
    msg: string | MessageElem | Iterable<MessageElem>
  ) {
    return this.client.sendPrivateMsg(receiverID, msg);
  }

  deleteMsg(msgID: string) {
    return this.client.deleteMsg(msgID);
  }

  banMember(userId: number, duration: number) {
    return this.client.setGroupBan(this.groupID, userId, duration);
  }
}
