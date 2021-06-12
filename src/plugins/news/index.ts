import {getWeiboHotNews, getWhatHappenedToTheWorld} from './api';
import {scheduleJob} from 'node-schedule';
import {GroupMessageEventData} from 'oicq';

import {bot, groupID, helper} from '../../bot';

import {Plugin} from '../../shared/types';

async function listener(data: GroupMessageEventData) {
  const {group_id, raw_message} = data;
  if (groupID !== group_id) return;
  if (raw_message === '热搜') {
    helper.sendMsg(await getWeiboHotNews());
  }
}

async function whatHappenedToTheWorld() {
  helper.sendMsg(await getWhatHappenedToTheWorld());
}

function install() {
  bot.on('message.group', listener);
  scheduleJob('0 0 8 * * *', whatHappenedToTheWorld);
}

const plugin: Plugin = {
  name: 'news',
  install,
};

export default plugin;
