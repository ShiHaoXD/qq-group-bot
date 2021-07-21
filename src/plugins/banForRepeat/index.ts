import {GroupMessageEventData} from 'oicq';
import {bot, groupID, helper} from '../../bot';
import {Plugin} from '../../shared/types';

let recentMessages: GroupMessageEventData[] = [];
const canRepeatTimes = 5;
const banTimeLimit = 5;
function banForRepeat() {
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

function listener(data: GroupMessageEventData) {
  const {group_id} = data;
  if (groupID !== group_id) return;
  recentMessages.push(data);

  if (recentMessages.length > canRepeatTimes) {
    recentMessages.shift();
    banForRepeat();
  }
}

function install() {
  bot.on('message.group', listener);
}

const plugin: Plugin = {
  name: 'banForRepeat',
  install,
};
export default plugin;
