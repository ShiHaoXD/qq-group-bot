import {GroupMessageEventData} from 'oicq';
import {bot, groupID, helper} from '../../bot';
import {Plugin} from '../../shared/types';
import {reply} from './config.private';
function talk(data: GroupMessageEventData) {
  const {raw_message, user_id} = data;
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

function install() {
  bot.on('message.group', data => {
    const {group_id} = data;
    if (group_id !== groupID) return;
    talk(data);
  });
}

const plugin: Plugin = {
  name: 'greet',
  install,
};

export default plugin;
