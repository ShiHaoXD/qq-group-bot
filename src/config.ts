import {Food, replyKeyword} from './interface';
import {applyLeaveSchool, getWeiboHotNews} from './plugins/';
import {genBaiduSearchUrl, genWhatToEat} from './utils';

export const canrepeatTimes = 3;

const foods: Food[] = [
  {
    type: '面/粉',
    restaurants: [
      '延生凉面',
      '延生新疆炒粉',
      '莘莘食堂',
      '中心食堂',
      '天桥面',
      '嬢嬢汤圆',
      '湖南卤面',
      '罐罐米线',
      '花甲米线',
    ],
  },
  {
    type: '快餐',
    restaurants: ['华莱士'],
  },
  {
    type: '鸡公煲',
    restaurants: ['新校门红色牌子'],
  },
  {
    type: '串串',
    restaurants: ['老九门'],
  },
  {
    type: '炒菜',
    restaurants: [
      '大米小面',
      '天香饭庄',
      '乡村下饭菜',
      '延生食堂',
      '莘莘食堂',
      '中心食堂',
    ],
  },
  {
    type: '大盘鸡',
    restaurants: ['新疆大盘鸡'],
  },
  {
    type: '烧烤',
    restaurants: ['三姐烧烤'],
  },
  {
    type: '鱼',
    restaurants: ['纸包鱼', '豆花鱼'],
  },
  {
    type: '抄手/馄饨',
    restaurants: ['李麻抄手', '延生食堂', '福建千里香馄饨'],
  },
  {
    type: '煎饼',
    restaurants: ['山东菜煎饼'],
  },
  {
    type: '粥',
    restaurants: ['李海粥王', '延生食堂'],
  },
  {
    type: '烤肉',
    restaurants: ['铁炙子'],
  },
  {
    type: '猪脚饭',
    restaurants: ['隆江猪脚饭'],
  },
  {
    type: '麻辣烫',
    restaurants: ['大骨麻辣烫'],
  },
];

const neverEatFoods: Food[] = [
  {
    type: '麻辣烫',
    restaurants: ['杨国福'],
  },
  {
    type: '螺蛳粉',
    restaurants: ['堕落街里', '堕落街外'],
  },
  {
    type: '炒菜',
    restaurants: ['无届'],
  },
  {
    type: '火锅',
    restaurants: ['六婶火锅'],
  },
];

export const replyKeywords: replyKeyword[] = [
  {
    keyword: /\S*段琦\S*/,
    reply: '[CQ:image,file=9b84db64514d694943dba06d899a52ad14467-284-324.jpg]',
  },
  {
    keyword: /\S*吴世浩\S*/,
    reply: '吴世浩？肥吴罢了',
  },
  {
    keyword: '骚零',
    reply: '[CQ:image,file=10017edb411edcd91d354f442274f62663480-472-923.jpg]',
  },
  {
    keyword: '烧钢',
    reply: '[CQ:image,file=3f07480bf24bc86d2c8c8777f65a250243022-852-640.jpg]',
  },
  {
    keyword: '吃什么',
    reply: () => genWhatToEat(foods),
  },
  {
    keyword: '什么没吃过',
    reply: () => genWhatToEat(neverEatFoods),
  },
  {
    keyword: '二维码',
    reply:
      '[CQ:image,file=6791a72977be236f55629bd697a1e260148087-800-1067.jpg][CQ:image,file=1e2dc4263e25c2bf2aee7ac785773151868902-3000-4000.jpg]',
  },
  {
    keyword: '热搜',
    reply: getWeiboHotNews,
  },
  {
    keyword: /百度 [\S\s]*/,
    reply: genBaiduSearchUrl,
    interactive: true,
  },
  {
    keyword: /申请 [\S]*/,
    reply: applyLeaveSchool,
    interactive: true,
  },
  {
    keyword: /\S*机器人\S*/,
    reply: '你才是机器人',
  },
];

export const recallKeywords: Array<string | RegExp> = [
  /\S*拼多多|pdd\S*/,
  '淘宝',
];
