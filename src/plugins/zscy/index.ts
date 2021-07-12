import {Plugin} from '../../shared/types';
import {scheduleJob} from 'node-schedule';
import {zscyAccounts} from './config.example';
import {helper} from '../../bot';
import {checkIn as checkInAPI, getCheckInStatus} from './api';

function checkIn() {
  zscyAccounts.forEach(async account => {
    const {data} = await checkInAPI(account);
    switch (data.status) {
      case 200: {
        const {data: statusData} = await getCheckInStatus(account);
        const {
          data: {check_in_days, rank, percent},
          status,
        } = statusData;
        if (status === 200) {
          helper.sendMsg(
            `${account.stunum} 签到成功\n今日第${rank}位签到\n已连续签到${check_in_days}天，超过${percent}的邮子`
          );
        }
        break;
      }
      case 403:
        helper.sendMsg(`${account.stunum} 签到失败，今日已签到`);
        break;
    }
  });
}

function install() {
  // 每天0点过1秒
  scheduleJob('1 0 0 * * *', checkIn);
}

const plugin: Plugin = {
  name: 'zscy',
  install,
};

export default plugin;
