import axios from 'axios';
import cheerio from 'cheerio';
import {GroupMessageEventData} from 'oicq';

import {bot, groupID, helper} from '../bot';
import {getNowTimeString} from '../shared/date';
import {Plugin} from '../shared/types';

const API = 'https://s.weibo.com/top/summary?cate=realtimehot';
const getWeiboHotNews = async () => {
  const result: string[] = [];
  const {data} = await axios.get(API);
  const $ = cheerio.load(data);
  $('.list_a li span').each((index, ele) => {
    if (index < 10)
      result.push(
        `${index + 1}、${$(ele).clone().children().remove().end().text()}`
      ); //只获取当前元素文字 不获取子元素文字
  });
  return `${getNowTimeString()}\n${result.join('\n')}`;
};

async function listener(data: GroupMessageEventData) {
  const {group_id, raw_message} = data;
  if (groupID !== group_id) return;
  if (raw_message === '热搜') {
    helper.sendMsg(await getWeiboHotNews());
  }
}

function install() {
  bot.on('message.group', listener);
}

const plugin: Plugin = {
  name: 'weibo',
  install,
};

export default plugin;
