import {scheduleJob} from 'node-schedule';
import type Helper from '../../Helper';
import {logger} from '../../shared/logger';
import type {installFn, Plugin} from '../../shared/types';
import {getWeather24Hours, getWeather3Days} from './api';

let yesterdayAvgTem = NaN;

async function willRainHorusLater(hour: number) {
  const {data} = await getWeather24Hours();
  if (data.code === '200') {
    for (let i = hour; i < hour; i++) {
      if (data.hourly[i].text.includes('雨')) {
        return true;
      }
    }
  }
  return false;
}

async function dailyWeather(helper: Helper) {
  try {
    const {data} = await getWeather3Days();
    if (data.code === '200') {
      const {daily} = data;
      const [todayWeather] = daily;
      const result: string[] = [];
      result.push('今日天气:');
      result.push(`最高气温: ${todayWeather.tempMax}`);
      result.push(`最低气温: ${todayWeather.tempMin}`);
      result.push(
        `天气: ${
          todayWeather.textDay === todayWeather.textNight
            ? todayWeather.textDay
            : `${todayWeather.textDay}转${todayWeather.textNight}`
        }`
      );
      todayWeather.precip !== '0.0' &&
        result.push('今日可能下雨，出门建议带伞');
      if (isNaN(yesterdayAvgTem)) {
        yesterdayAvgTem =
          (parseInt(todayWeather.tempMax, 10) +
            parseInt(todayWeather.tempMin, 10)) /
          2;
        helper.sendMsg(result.join('\n'));
        return;
      }
      const avgTem =
        (parseInt(todayWeather.tempMax, 10) +
          parseInt(todayWeather.tempMin, 10)) /
        2;
      result.push(
        `今日平均气温较昨日${
          avgTem > yesterdayAvgTem ? '升高' : '降低'
        }${Math.abs(avgTem - yesterdayAvgTem)}度`
      );
      helper.sendMsg(result.join('\n'));
      return;
    }
  } catch (error) {
    logger.error((error as Error).message);
  }
}

async function weatherForecast(helper: Helper) {
  try {
    if (await willRainHorusLater(2)) {
      helper.sendMsg('未来两小时内有雨，记得带伞');
    }
  } catch (error) {
    logger.error((error as Error).message);
  }
}

const install: installFn = (_, helper) => {
  scheduleJob('0 */2 * * *', () => weatherForecast(helper));
  scheduleJob('0 0 7 * * *', () => dailyWeather(helper));
};

export const WeatherForecast: Plugin = {
  name: '天气预报',
  install,
};
