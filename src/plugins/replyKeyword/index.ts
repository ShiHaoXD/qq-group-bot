import {GroupMessageEventData} from 'oicq';

import {bot, groupID, helper} from '../../bot';
import {Plugin} from '../../shared/types';
import {replyKeywords} from './config';

function listener(data: GroupMessageEventData) {
  const {group_id, raw_message} = data;
  if (groupID !== group_id) return;
  replyKeywords.forEach(async e => {
    if (e.regex.test(raw_message)) {
      helper.sendMsg(e.reply);
    }
  });
}

function install() {
  bot.on('message.group', listener);
}

const plugin: Plugin = {
  name: 'replyKeyword',
  install,
};

export default plugin;
