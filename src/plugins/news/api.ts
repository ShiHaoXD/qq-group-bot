import axios from 'axios';
import cheerio from 'cheerio';
import {launch} from 'puppeteer';
import {getNowTimeString} from '../../shared/date';
const API = 'https://s.weibo.com/top/summary?cate=realtimehot';

export const getWeiboHotNews = async () => {
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

export const getWhatHappenedToTheWorld = async () => {
  const browser = await launch();
  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'
  );
  await page.goto('https://web.okjike.com/topic/553870e8e4b0cafb0a1bef68');
  await page.waitForSelector('.Content__TruncateContainer-sc-10t82py-0');
  const result = await page.evaluate(() => {
    const result: string[] = [];
    result.push('一觉醒来世界发生了什么');
    const container = document.querySelector(
      '.Content__TruncateContainer-sc-10t82py-0'
    )!;
    const spans = container.querySelectorAll('span');
    spans.forEach((e, index) => {
      if (/[0-9]+./.test(e.textContent as string) || index === 0) {
        result.push(e.textContent as string);
      }
    });
    return result.join('\n');
  });
  await browser.close();
  return result;
};
