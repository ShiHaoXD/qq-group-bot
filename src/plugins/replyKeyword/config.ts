import {replyKeyword} from '../../shared/types';
import {privateReplyKeywords} from './config.private';
export const replyKeywords: replyKeyword[] = [
  {
    regex: /\S*机器人\S*/,
    reply: '你才是机器人',
  },
  ...privateReplyKeywords,
];
