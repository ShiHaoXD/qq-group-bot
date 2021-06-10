import {GroupMessageEventData} from 'oicq';
import {bot, groupID, helper} from '../../bot';
import {Plugin} from '../../shared/types';
import {recallKeywords} from './config';

function listener(data: GroupMessageEventData) {
  const {group_id, raw_message, message_id} = data;
  if (groupID !== group_id) return;
  if (recallKeywords.some(regex => regex.test(raw_message))) {
    helper.deleteMsg(message_id);
  }
}

function install() {
  bot.on('message.group', listener);
}

const plugin: Plugin = {
  name: 'recallKeyword',
  install,
};

export default plugin;
