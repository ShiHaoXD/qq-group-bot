import {scheduleJob} from 'node-schedule';
import {helper} from '../../bot';
import {Plugin} from '../../shared/types';
import {getWeather} from './api';

async function weatherForecast() {
  const {data} = await getWeather();
  if (data.code === '200') {
    for (let i = 0; i < 2; i++) {
      if (data.hourly[i].text.includes('雨')) {
        helper.sendMsg('未来两小时内有雨，记得带伞');
        break;
      }
    }
  }
}

function install() {
  scheduleJob('0 */2 * * *', weatherForecast);
}

const plugin: Plugin = {
  name: 'weatherForecast',
  install,
};

export default plugin;
