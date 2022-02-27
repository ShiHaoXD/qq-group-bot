import {GroupMessageEventData} from 'oicq';
import Helper from '../../Helper';
import {installFn, Plugin} from '../../shared/types';

let recentMessages: GroupMessageEventData[] = [];
const canRepeatTimes = 5;
const banTimeLimit = 5;
function banForRepeat(helper: Helper) {
  recentMessages = recentMessages.map(e => {
    if (e.raw_message.startsWith('[CQ:')) {
      e.raw_message = e.raw_message.split(',')[1];
    }
    return e;
  });
  const raw = recentMessages[0].raw_message;
  if (recentMessages.every(e => e.raw_message === raw)) {
    const banTime = Math.ceil(Math.random() * banTimeLimit) * 60;
    helper.banMember(
      recentMessages[recentMessages.length - 1].user_id,
      banTime
    );
  }
}

function listener(data: GroupMessageEventData, helper: Helper) {
  const {group_id} = data;
  if (helper.groupID !== group_id) return;
  recentMessages.push(data);

  if (recentMessages.length > canRepeatTimes) {
    recentMessages.shift();
    banForRepeat(helper);
  }
}

const install: installFn = (client, helper) => {
  client.on('message.group', data => listener(data, helper));
};

export const BanForRepeat: Plugin = {
  name: '复读禁言',
  install,
};
