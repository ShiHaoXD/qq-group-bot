import type {GroupMessageEvent} from 'oicq';
import type Helper from '../../Helper';

import type {installFn, Plugin} from '../../shared/types';
import {replyKeywords} from './config';

function listener(data: GroupMessageEvent, helper: Helper) {
  const {group_id, raw_message} = data;
  if (helper.groupID !== group_id) return;
  replyKeywords.forEach(async e => {
    if (e.regex.test(raw_message)) {
      helper.sendMsg(e.reply);
    }
  });
}

const install: installFn = (client, helper) => {
  client.on('message.group', data => listener(data, helper));
};

export const ReplyKeyword: Plugin = {
  name: '关键词回复',
  install,
};
