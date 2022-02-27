import {GroupMessageEventData} from 'oicq';
import {scheduleJob} from 'node-schedule';
import {installFn, Plugin} from '../../shared/types';
import {getWeiboHotNews, getWhatHappenedToTheWorld} from './api';
import Helper from '../../Helper';

async function listener(data: GroupMessageEventData, helper: Helper) {
  const {group_id, raw_message} = data;
  if (helper.groupID !== group_id) return;
  if (raw_message === '热搜') {
    helper.sendMsg(await getWeiboHotNews());
  }
}

async function whatHappenedToTheWorld(helper: Helper) {
  helper.sendMsg(await getWhatHappenedToTheWorld());
}

const install: installFn = (client, helper) => {
  client.on('message.group', data => listener(data, helper));
  scheduleJob('0 0 8 * * *', () => whatHappenedToTheWorld(helper));
};

export const News: Plugin = {
  name: '新闻',
  install,
};
