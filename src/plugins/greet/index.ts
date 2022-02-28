import {GroupMessageEvent} from 'oicq';
import Helper from '../../Helper';
import {installFn, Plugin} from '../../shared/types';
import {reply} from './config.private';
function talk(data: GroupMessageEvent, helper: Helper) {
  const {
    raw_message,
    sender: {user_id},
  } = data;
  if (/\S*机器人\S*/.test(raw_message)) {
    if (Object.keys(reply).includes(user_id + '')) {
      helper.sendMsg(
        reply[user_id + ''][
          Math.floor(Math.random() * reply[user_id + ''].length)
        ]
      );
    } else {
      helper.sendMsg('你才是机器人');
    }
  }
}

const install: installFn = (client, helper) => {
  client.on('message.group', data => {
    const {group_id} = data;
    if (group_id !== helper.groupID) return;
    talk(data, helper);
  });
};

export const Greet: Plugin = {
  name: '对话交互',
  install,
};
