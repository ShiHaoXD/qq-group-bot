import type {replyKeyword} from '../../shared/types';

// 如需发送多媒体内容，请查看 https://github.com/takayama-lily/oicq/wiki/90.%E5%A6%82%E4%BD%95%E5%8F%91%E9%80%81%E5%A4%9A%E5%AA%92%E4%BD%93%E5%86%85%E5%AE%B9(CQ%E7%A0%81)

export const privateReplyKeywords: replyKeyword[] = [
  {
    regex: /正则表达式/,
    reply: '回复',
  },
];
