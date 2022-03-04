import type {Client, Sendable} from 'oicq';
import type {Plugin} from './shared/types';

export default class Helper {
  readonly client: Client;
  readonly groupID: number;
  plugins: Plugin[];
  constructor(client: Client, groupID: number) {
    this.client = client;
    this.groupID = groupID;
    this.plugins = [];
  }
  sendMsg(msg: Sendable) {
    return this.client.sendGroupMsg(this.groupID, msg);
  }

  sendPrivateMsg(receiverID: number, msg: Sendable) {
    return this.client.sendPrivateMsg(receiverID, msg);
  }

  deleteMsg(msgID: string) {
    return this.client.deleteMsg(msgID);
  }

  banMember(userId: number, duration: number) {
    return this.client.setGroupBan(this.groupID, userId, duration);
  }
}
