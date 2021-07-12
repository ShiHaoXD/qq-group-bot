import {scheduleJob} from 'node-schedule';
import {helper} from '../../bot';
import {Plugin} from '../../shared/types';
import {getJwzxNews} from './api';

const readedNews = new Map<string, string>();

async function JwzxNews() {
  const {
    data: {data: list},
  } = await getJwzxNews(1);
  const result: string[] = [];
  result.push('教务在线新闻:');
  for (let i = 0; i < list.length; i++) {
    const e = list[i];
    if (!readedNews.has(e.id)) {
      readedNews.set(e.id, e.title);
      result.push(`${i + 1} ${e.title}`);
    } else break;
  }
  result.length > 1 && helper.sendMsg(result.join('\n'));
}

function install() {
  scheduleJob('0 0 * * * *', JwzxNews);
}

const plugin: Plugin = {
  name: 'jwzx',
  install,
};

export default plugin;
