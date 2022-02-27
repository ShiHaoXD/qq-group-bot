import {GroupMessageEvent} from 'oicq';
import Helper from '../../Helper';
import {installFn, Plugin} from '../../shared/types';
import {recallKeywords} from './config';

function listener(data: GroupMessageEvent, helper: Helper) {
  const {group_id, raw_message, message_id} = data;
  if (helper.groupID !== group_id) return;
  if (recallKeywords.some(regex => regex.test(raw_message))) {
    helper.deleteMsg(message_id);
  }
}

const install: installFn = (client, helper) => {
  client.on('message.group', data => listener(data, helper));
};

export const RecallKeyword: Plugin = {
  name: '关键词撤回',
  install,
};
