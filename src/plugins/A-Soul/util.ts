const puppeteer = require('puppeteer');
import type {Sendable} from 'oicq';
import {segment} from 'oicq';
import type {Browser} from 'puppeteer';
import {Urls} from './info';
import type {Data, Dates} from './types';
export const initBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {width: 1920, height: 1080},
    args: ['--start-maximized', '--no-sandbox'],
    ignoreDefaultArgs: ['--enable-automation'],
  });
  return browser.wsEndpoint();
};
export const closeBrowser = async (browserWSEndpoint: string) => {
  const browser = await puppeteer.connect({
    browserWSEndpoint,
  });
  await browser.close();
};
export const get_Page_Date = async (
  browser: Browser,
  url: String,
  name: String
) => {
  //创建一个Page实例
  const page = await browser.newPage();

  await page.goto(`${url}`, {
    timeout: 30000,
    waitUntil: ['networkidle0'],
  });

  const data: Data = await page.evaluate(async () => {
    function check() {
      let type_Str = '';
      if (mainCard.querySelector('.repost')) {
        type_Str += 'repost';
      }
      if (mainCard.querySelector('.video-container')) {
        type_Str += 'video';
      }
      if (mainCard.querySelector('.imagesbox')) {
        type_Str += 'imgbox';
      }
      if (mainCard.querySelector('.content-full')) {
        type_Str += 'content';
      }
      return type_Str;
    }
    //判断是否为转发动态
    function ifFirstCard() {
      if (!document.querySelector('.first-card-with-title')) {
        return document.querySelector('.card')!;
      } else {
        return document.querySelectorAll('.card .main-content')[1];
      }
    }
    const imgUrlReg = /\/\/\S*(.jpg|.png)/g;
    const mainCard = ifFirstCard();
    const isRePost = check();
    const time = mainCard.querySelector('.detail-link')!.innerHTML;
    const msgUrl = (<HTMLLinkElement>mainCard.querySelector('.detail-link')!)
      .href;
    let post_Content = '';

    let repost_Sender = '';
    let repost_content = '';
    let video_content = '';
    let imgSrc = '';
    let videoSrc = '';

    if (isRePost.indexOf('repost') >= 0) {
      repost_Sender = mainCard.querySelector('.repost .up-info .username')!
        .innerHTML!;
      repost_content = (<HTMLElement>(
        mainCard.querySelector('.repost .content-full')!
      )).innerText;
    }
    if (isRePost.indexOf('imgbox') >= 0) {
      imgSrc =
        'https:' +
        (<HTMLImageElement>(
          mainCard.querySelector('.imagesbox .img-content')!
        )).style.backgroundImage
          .match(imgUrlReg)!
          .join('');
    }
    if (isRePost.indexOf('video') >= 0) {
      imgSrc =
        'https:' +
        (<HTMLImageElement>(
          mainCard.querySelector('.video-container .image-area img')!
        )).src
          .match(imgUrlReg)!
          .join('');
      video_content = (<HTMLElement>(
        mainCard.querySelector('.video-container .content')!
      )).innerText;
      videoSrc = (<HTMLLinkElement>(
        mainCard.querySelector('.video-container a')!
      )).href;
    }
    if (isRePost.indexOf('content') >= 0) {
      post_Content = (<HTMLElement>(
        mainCard.querySelector('.content .content-full')!
      )).innerText!; //动态内容
    }
    return {
      time,
      msgUrl,
      post_Content,
      repost_Sender,
      repost_content,
      imgSrc,
      video_content,
      videoSrc,
    };
  });
  await page.close();
  return {
    name,
    data,
  };
};
export const get_Date = async (browserWSEndpoint: string) => {
  //直接连接已经存在的 Chrome
  const browser = await puppeteer.connect({
    browserWSEndpoint: browserWSEndpoint,
  });
  // const task: any[] = [];
  // Urls.forEach(val => {
  //   task.push(
  //     (async () => {
  //       const data: Dates = await get_Page_Date(browser, val.url,val.name);
  //       return data
  //     })()
  //   );
  // });
  // const Dates: Dates[] = await Promise.all(task);   //<-并发式获取数据，要求多核，单核真不行
  const Dates: Dates[] = [];
  for (const url of Urls) {
    Dates.push(await get_Page_Date(browser, url.url, url.name)); //单核版
  }
  return Dates;
};
export const isNewMsg = (Dates: Dates[], reg: RegExp) => {
  const str: Sendable[] = [];
  Dates.forEach(val => {
    if (reg.test(val.data.time)) {
      str.push([stringFormat(val), segment.image(val.data.imgSrc)]);
    }
  });
  return str;
};
export const stringFormat = (val: Dates) => {
  let str = '';
  str = val.name + ':\n';
  str += val.data.time + '\n';
  str += '\t' + val.data.post_Content + '\n';
  str += val.data.repost_Sender
    ? '原动态: \n' + '\t原动态up:' + val.data.repost_Sender + '\n'
    : val.data.repost_Sender + val.data.repost_content + '\n';
  str += val.data.video_content + '\n' + val.data.repost_content + '\n';
  str += val.data.msgUrl + '\n';
  return str;
};
export const getIndexByName = (Dates: Dates[], name: String) =>
  Dates.findIndex(x => x.name === name);

export const getReg = () =>
  RegExp('^获取(' + Urls.map(e => e.name).join('|') + ')最新动态$', 'i');
