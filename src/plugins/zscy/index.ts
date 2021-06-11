import {Plugin} from '../../shared/types';
import {scheduleJob} from 'node-schedule';
import axios from 'axios';
import {zscyAccounts} from './config.private';
import {helper} from '../../bot';
const checkInAPI =
  'https://be-prod.redrock.team/magipoke-intergral/QA/Integral/checkIn';

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
};

function checkIn() {
  zscyAccounts.forEach(async account => {
    const {data} = await axios.post(checkInAPI, account, options);
    switch (data.status) {
      case 200:
        helper.sendMsg(`${account.stunum}签到成功`);
        break;
      case 403:
        helper.sendMsg(`${account.stunum}签到失败，今日已签到`);
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
