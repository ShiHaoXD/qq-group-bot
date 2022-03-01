import {scheduleJob} from 'node-schedule';
import {zscyAccounts} from './config.private';
import {checkIn as checkInAPI, getCheckInStatus} from './apis/checkin';
import {SUCCESS_STATUS} from './apis/common';
import {getToken, TokenReq} from './apis/login';
import {getInfo, progressTask} from './apis/integral';
import type Helper from '../../Helper';
import type {GetInfoResData} from './apis/integral';
import type {TaskItem} from './apis/integral';
import type {Plugin, ZscyAccount, installFn} from '../../shared/types';

// 睡眠函数
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function dailyTask(helper: Helper) {
  for (const account of zscyAccounts) {
    await checkIn(account, helper);
    await stampTask(account, helper);
  }
}

async function checkIn(account: ZscyAccount, helper: Helper) {
  const loginInfo: TokenReq = {
    stuNum: account.stuNum,
    idNum: account.idNum,
  };
  const {data} = await checkInAPI(loginInfo);
  switch (data.status) {
    case SUCCESS_STATUS: {
      const {data: statusData} = await getCheckInStatus(loginInfo);
      const {
        data: {check_in_days, rank, percent},
      } = statusData;
      helper.sendPrivateMsg(
        account.qq,
        `签到成功\n今日第${rank}位签到\n已连续签到${check_in_days}天，超过${percent}的邮子`
      );
      break;
    }
    case 403:
      helper.sendPrivateMsg(account.qq, `签到失败，今日已签到`);
      break;
    default:
      helper.sendPrivateMsg(account.qq, `签到失败，${data.info}`);
      break;
  }
}

async function stampTask(account: ZscyAccount, helper: Helper) {
  // const PLACE_HOLDER = Symbol('placeholder');
  let msg: string[] = ['每日邮票任务：'];
  let totalGainStamp = 0;
  const token = await getToken({
    idNum: account.idNum,
    stuNum: account.stuNum,
  });
  const {
    data: {data},
  } = await getInfo(token);
  const {task, user_amount} = data;
  const unFinnishBaseTask: TaskItem[] = task.filter(
    item => item.current_progress < item.max_progress && item.type === 'base'
  );
  if (unFinnishBaseTask.length === 0) return;
  // 遍历完成每个任务
  for (const task of unFinnishBaseTask) {
    const lastTimes = task.max_progress - task.current_progress;
    // 请求太快会只生效一次
    // const result = await Promise.allSettled(
    //   new Array(lastTimes)
    //     .fill(PLACE_HOLDER)
    //     .map(() => progressTask(task.title, token))
    // );
    const results: GetInfoResData[] = [];
    let isDone = false;
    for (let i = 0; i < lastTimes; i++) {
      try {
        const {data} = await progressTask(task.title, token);
        results.push(data.data);
        if (i === lastTimes - 1) {
          isDone = true;
        }
      } catch (e: any) {
        msg.push(`${task.title}失败，${e?.message}`);
      } finally {
        await sleep(1000);
      }
    }
    if (isDone) {
      msg.push(`${task.title}任务完成，获得邮票 ${task.gain_stamp}`);
      totalGainStamp += task.gain_stamp;
    } else {
      msg.push(`${task.title}任务未完成`);
    }
  }
  msg.push(`总获得邮票：${totalGainStamp}`);
  msg.push(`当前邮票：${user_amount + totalGainStamp}`);

  helper.sendPrivateMsg(account.qq, msg.join('\n'));
}

const install: installFn = (_, helper) => {
  scheduleJob('1 0 0 * * *', () => dailyTask(helper));
};

export const HandleCqupt: Plugin = {
  name: '掌邮',
  install,
};
