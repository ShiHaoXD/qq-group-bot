import {
  initBrowser,
  get_Date,
  closeBrowser,
  stringFormat,
  getIndexByName,
  isNewMsg,
  getReg,
} from './util';
import {scheduleJob, RecurrenceRule} from 'node-schedule';
import type {installFn, Plugin} from '../../shared/types';
import type {Dates} from './types';
import {segment} from 'oicq';
const install: installFn = async (client, helper) => {
  const Reg = getReg();
  const timeReg = /([0|1|2|3|4|5|6]{1} 分钟前|刚刚)/g;
  const rule = new RecurrenceRule();
  const times_minutes = [3, 9, 15, 21, 27, 33, 39, 45, 51, 57, 59];
  rule.minute = times_minutes;
  let flag = true;
  let browserWSEndpoint;
  const browserWSEndpoint_init = await initBrowser(); //初始化
  let Dates: Dates[] = await get_Date(browserWSEndpoint_init); //初始化数组
  await closeBrowser(browserWSEndpoint_init);
  let lastedMsg = isNewMsg(Dates, timeReg);
  // scheduleJob('5 0 0 * * *', async () => {
  //   //每日重启浏览器
  //   flag = false;
  //   await closeBrowser(browserWSEndpoint);
  //   browserWSEndpoint = await initBrowser();
  //   flag = true;
  // });
  scheduleJob(rule, async () => {
    //设置每6分钟爬取一次

    flag = false; //锁住
    browserWSEndpoint = await initBrowser();
    Dates = await get_Date(browserWSEndpoint);
    lastedMsg = isNewMsg(Dates, timeReg);
    if (lastedMsg !== []) {
      lastedMsg.forEach(val => {
        helper.sendMsg(val);
      });
    }
    flag = true;
    await closeBrowser(browserWSEndpoint);
  });
  client.on('message.group', async msg => {
    if (Reg.test(msg.raw_message)) {
      const index = getIndexByName(Dates, msg.raw_message.slice(2, 4));
      if (Dates[index].data.imgSrc !== '') {
        helper.sendMsg([
          stringFormat(Dates[index]),
          segment.image(Dates[index].data.imgSrc),
        ]);
      } else if (Dates[index].data.imgSrc === '') {
        helper.sendMsg([stringFormat(Dates[index])]);
      }
    }
    if (msg.raw_message === '强制更新数据' && flag) {
      flag = false;
      browserWSEndpoint = await initBrowser();
      helper.sendMsg('正在强制更新');
      Dates = await get_Date(browserWSEndpoint);
      helper.sendMsg('强制更新成功');
      await closeBrowser(browserWSEndpoint);
      setTimeout(() => {
        flag = true;
      }, 1000 * 60);
    } else if (msg.raw_message === '强制更新数据' && !flag) {
      helper.sendMsg('数据正在更新中');
    }
    if (msg.raw_message === '获取最新动态') {
      if (!lastedMsg) {
        helper.sendMsg(lastedMsg);
      } else {
        helper.sendMsg('十分钟内无最新动态');
      }
    }
    scheduleJob(rule, async () => {
      //设置每6分钟爬取一次
      flag = false; //锁住
      browserWSEndpoint = await initBrowser();
      Dates = await get_Date(browserWSEndpoint);
      lastedMsg = isNewMsg(Dates, timeReg);
      if (lastedMsg !== []) {
        lastedMsg.forEach(helper.sendMsg);
      }
      flag = true;
      await closeBrowser(browserWSEndpoint);
    });
  });
};
export const A_Soul: Plugin = {
  name: 'A-Soul',
  install,
};
