import {scheduleJob} from 'node-schedule';
import type {GroupMessageEvent, PrivateMessageEvent} from 'oicq';
import type Helper from '../../Helper';
import type {installFn, Plugin} from '../../shared/types';
import {infos} from './config.private';
import type {LEAVE_OR_BACK_TYPE} from './constants';
import {applyLeaveSchool, leaveOrBackSchool} from './free';
import healthClockin from './healthClockin';

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
    const action = msg.split(' ')[0] as LEAVE_OR_BACK_TYPE;
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
          : sender(await leaveOrBackSchool(key, msg as LEAVE_OR_BACK_TYPE));
      }
    });
  } else if (regexClockin.test(msg)) {
    const action = msg.split(' ')[1];
    clockinSwitch = action === '开';
  }
}

function groupListener(data: GroupMessageEvent, helper: Helper) {
  const {
    raw_message,
    group_id,
    sender: {user_id},
  } = data;
  if (group_id && helper.groupID !== group_id) return;
  check(user_id, raw_message, helper.sendMsg.bind(helper));
}

function privateListener(data: PrivateMessageEvent, helper: Helper) {
  const {raw_message, from_id} = data;
  check(from_id, raw_message, helper.sendPrivateMsg.bind(helper, from_id));
}

const install: installFn = (client, helper) => {
  client.on('message.group', data => groupListener(data, helper));
  client.on('message.private', data => privateListener(data, helper));
  scheduleJob('5 0 0 * * *', () => {
    if (clockinSwitch) {
      for (const name in infos) {
        healthClockin(name, helper);
      }
    }
  });
};

export const WeCqupt: Plugin = {
  name: 'weCqupt',
  install,
};
