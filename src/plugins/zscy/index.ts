import {installFn, Plugin} from '../../shared/types';
import {scheduleJob} from 'node-schedule';
import {zscyAccounts} from './config.private';
import {checkIn as checkInAPI, getCheckInStatus} from './api';
import Helper from '../../Helper';

function checkIn(helper: Helper) {
  zscyAccounts.forEach(async account => {
    const {data} = await checkInAPI(account);
    switch (data.status) {
      case 10000: {
        const {data: statusData} = await getCheckInStatus(account);
        const {
          data: {check_in_days, rank, percent},
        } = statusData;
        helper.sendMsg(
          `${account.stunum} 签到成功\n今日第${rank}位签到\n已连续签到${check_in_days}天，超过${percent}的邮子`
        );
        break;
      }
      case 403:
        helper.sendMsg(`${account.stunum} 签到失败，今日已签到`);
        break;
    }
  });
}

const install: installFn = (_, helper) => {
  scheduleJob('1 0 0 * * *', () => checkIn(helper));
};

export const HandleCqupt: Plugin = {
  name: '掌邮',
  install,
};
