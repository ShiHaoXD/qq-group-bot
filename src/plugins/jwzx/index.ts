import {scheduleJob} from 'node-schedule';
import {helper} from '../../bot';
import {Plugin} from '../../shared/types';
import {getJwzxNews} from './api';

const readedNewsID: string[] = [];

async function JwzxNews() {
  const {data} = await getJwzxNews(1);
  const result: string[] = [];
  result.push('教务在线新闻:\n');
  data.data.forEach((e: any, index: number) => {
    if (!readedNewsID.includes(e.id)) {
      readedNewsID.push(e.id);
      result.push(`${index + 1}、${e.title}`);
    }
  });
  result.length > 1 && helper.sendMsg(result.join('\n'));
}

function install() {
  scheduleJob('0 0 0 * * *', JwzxNews);
}

const plugin: Plugin = {
  name: 'jwzx',
  install,
};

export default plugin;
