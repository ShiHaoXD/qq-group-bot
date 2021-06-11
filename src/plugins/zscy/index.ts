import {Plugin} from '../../shared/types';
import {scheduleJob} from 'node-schedule';
import axios from 'axios';
import {zscyAccounts} from './config.private';
import {helper} from '../../bot';
import qs from 'qs';

const checkInAPI =
  'https://be-prod.redrock.team/magipoke-intergral/QA/Integral/checkIn';
const cheackInStatusAPI =
  'https://be-prod.redrock.team/magipoke-intergral/QA/User/getScoreStatus';
const options = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

function checkIn() {
  zscyAccounts.forEach(async account => {
    const {data} = await axios.post(checkInAPI, qs.stringify(account), options);
    switch (data.status) {
      case 200: {
        const {data: statusData} = await axios.post(
          cheackInStatusAPI,
          qs.stringify(account),
          options
        );
        const {
          data: {check_in_days, rank, percent},
          status,
        } = statusData;
        if (status === 200) {
          helper.sendMsg(
            `${account.stunum} 签到成功\n今日排名第 ${rank}名\n已连续签到${check_in_days}天，超越了${percent}的人`
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
