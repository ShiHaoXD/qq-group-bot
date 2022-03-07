import {scheduleJob} from 'node-schedule';
import type Helper from '../../Helper';
import {logger} from '../../shared/logger';
import type {installFn, Plugin} from '../../shared/types';
import {getWeather} from './api';

async function weatherForecast(helper: Helper) {
  try {
    const {data} = await getWeather();
    if (data.code === '200') {
      for (let i = 0; i < 2; i++) {
        if (data.hourly[i].text.includes('雨')) {
          helper.sendMsg('未来两小时内有雨，记得带伞');
          break;
        }
      }
    }
  } catch (error) {
    logger.error((error as Error).message);
  }
}

const install: installFn = (_, helper) => {
  scheduleJob('0 */2 * * *', () => weatherForecast(helper));
};

export const WeatherForecast: Plugin = {
  name: '天气预报',
  install,
};
