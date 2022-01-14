import {GroupMessageEventData, PrivateMessageEventData} from 'oicq';

import {bot, helper, groupID} from '../../bot';
import {Plugin} from '../../shared/types';
import {infos} from './config.example';
import healthClockin from './healthClockin';
import {scheduleJob} from 'node-schedule';
import {applyLeaveSchool, leaveOrBackSchool} from './free';
let clockinSwitch = true;

async function check(
  user_id: number,
  msg: string,
  sender: (msg: string) => void
) {
  const regex = /申请 [\S]*/;
  const regexLeaveOrBack = /[出入]校 [\S]*/;
  const regexClockin = /打卡 [开关]/;
  if (regex.test(msg) || regexLeaveOrBack.test(msg)) {
    const action = msg.split(' ')[0];
    const name = msg.split(' ')[1];
    if (Object.keys(infos).includes(name)) {
      if (infos[name].owner_id === user_id) {
        regex.test(msg)
          ? sender(await applyLeaveSchool(name))
          : sender(await leaveOrBackSchool(name, action));
      } else {
        sender('你不是该账号拥有者，无法申请');
      }
    } else {
      sender('没有你的数据 请联系管理员添加');
    }
  } else if (['出校', '入校', '申请'].includes(msg)) {
    Object.keys(infos).forEach(async key => {
      if (user_id === infos[key].owner_id) {
        msg === '申请'
          ? sender(await applyLeaveSchool(key))
          : sender(await leaveOrBackSchool(key, msg));
      }
    });
  } else if (regexClockin.test(msg)) {
    const action = msg.split(' ')[1];
    clockinSwitch = action === '开' ? true : false;
  }
}

function groupListener(data: GroupMessageEventData) {
  const {raw_message, group_id, user_id} = data;
  if (group_id && groupID !== group_id) return;
  check(user_id, raw_message, helper.sendMsg.bind(helper));
}

function privateListener(data: PrivateMessageEventData) {
  const {raw_message, user_id} = data;
  check(user_id, raw_message, helper.sendPrivateMsg.bind(helper, user_id));
}

function install() {
  bot.on('message.group', groupListener);
  bot.on('message.private', privateListener);
  scheduleJob('5 0 0 * * *', () => {
    if (clockinSwitch) {
      for (const name in infos) {
        healthClockin(name);
      }
    }
  });
}

const plugin: Plugin = {
  name: 'weCqupt',
  install,
};

export default plugin;
