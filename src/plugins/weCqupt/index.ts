import {GroupMessageEventData, PrivateMessageEventData} from 'oicq';

import {bot, helper, groupID} from '../../bot';
import {getLocalTime, getNowTimestamp, getTodayDate} from '../../shared/date';
import {Plugin} from '../../shared/types';
import {infos} from './config.example';
import {apply, getClockinStatus, getLocation, clockin} from './api';
import {scheduleJob} from 'node-schedule';

let clockinSwitch = true;

const dateCode = [
  's9ZS',
  'jQkB',
  'RuQM',
  'O0_L',
  'Buxf',
  'LepV',
  'Ec6w',
  'zPLD',
  'eZry',
  'QjBF',
  'XPB0',
  'zlTr',
  'YDr2',
  'Mfdu',
  'HSoi',
  'frhT',
  'GOdB',
  'AEN0',
  'zX0T',
  'wJg1',
  'fCmn',
  'SM3z',
  '2U5I',
  'LI3u',
  '3rAY',
  'aoa4',
  'Jf9u',
  'M69T',
  'XCea',
  '63gc',
  '6_Kf',
];
const hourCode = [
  '89KC',
  'pzTS',
  'wgte',
  '29_3',
  'GpdG',
  'FDYl',
  'vsE9',
  'SPJk',
  '_buC',
  'GPHN',
  'OKax',
  '_Kk4',
  'hYxa',
  '1BC5',
  'oBk_',
  'JgUW',
  '0CPR',
  'jlEh',
  'gBGg',
  'frS6',
  '4ads',
  'Iwfk',
  'TCgR',
  'wbjP',
];

function getMrdkKey(d: any, h: any) {
  return dateCode[d] + hourCode[h];
}

const random = (min: any, max: any) => {
  return parseInt(Math.random() * (max - min + 1) + min, 10);
};

const initialInfo = {
  nj: '2019',
  qjsy: '1',
  wcxxdd: '1',
  wcmdd: '重庆市,重庆市,南岸区',
  qjlx: '市内当日离返校',
  beizhu: '',
};

async function applyLeaveSchool(name: string) {
  const {xh, xy, openid} = infos[name].info;
  const requestData = {
    xh,
    name,
    xy,
    openid,
    ...initialInfo,
    yjfxsj: getTodayDate(),
    wcrq: getTodayDate(),
    timestamp: getNowTimestamp(),
  };
  const {data} = await apply(requestData);

  if (data.status === 200) {
    return '申请成功';
  } else {
    return data.message;
  }
}

async function check(
  user_id: number,
  msg: string,
  sender: (msg: string) => void
) {
  const regex = /申请 [\S]*/;
  const regexClockin = /打卡 [开关]/;
  if (regex.test(msg)) {
    const name = msg.split(' ')[1];
    if (Object.keys(infos).includes(name)) {
      if (infos[name].owner_id === user_id) {
        regex.test(msg) && sender(await applyLeaveSchool(name));
      } else {
        sender('你不是该账号拥有者，无法申请');
      }
    } else {
      sender('没有你的数据 请联系管理员添加');
    }
  } else if (msg === '申请') {
    Object.keys(infos).forEach(async key => {
      if (user_id === infos[key].owner_id) {
        sender(await applyLeaveSchool(key));
      }
    });
  } else if (regexClockin.test(msg)) {
    const action = msg.split(' ')[1];
    clockinSwitch = action === '开' ? true : false;
  }
}
async function healthClockin(name: string) {
  try {
    const {openid, xh, address, gender} = infos[name].info;

    const {data: clockinStatus} = await getClockinStatus({
      xh,
      timestamp: getNowTimestamp(),
    });
    const count = clockinStatus.data.count;
    if (count === '0') {
      const {data: locationData} = await getLocation(address);
      const result = locationData.result;
      const lng = result.location.lng;
      const lat = result.location.lat;
      const addressBig = `${result.address_components.province},${result.address_components.city},${result.address_components.district}`;
      const locationSmall =
        result.address_components.city +
        result.address_components.district +
        result.title;
      const locationBig = `中国,${result.address_components.province},${result.address_components.city},${result.address_components.district}`;
      await clockin({
        name,
        xh,
        xb: gender,
        openid,
        locationBig,
        locationSmall,
        latitude: parseFloat((lat + random(10, 99) * 0.000001).toFixed(6)),

        longitude: parseFloat((lng + random(10, 99) * 0.000001).toFixed(6)),

        szdq: addressBig,

        xxdz: address,

        // 新冠肺炎风险等级，非低风险地区请勿使用

        ywjcqzbl: '低风险',

        // 14 天内是否有中高风险地区旅居史

        ywjchblj: '无',

        // 14 天内是否接触过有中高风险地区旅居史的人员

        xjzdywqzbl: '无',

        // 今日体温是否正常

        twsfzc: '是',

        // 今日是否有与新冠病毒感染有关的症状

        ywytdzz: '无',

        // 备注

        beizhu: '无',

        mrdkkey: getMrdkKey(
          getLocalTime().getUTCDate(),
          getLocalTime().getUTCHours()
        ),

        timestamp: getNowTimestamp(),
      });
      helper.sendPrivateMsg(infos[name].owner_id, '今日打卡成功');
    }
  } catch (error) {
    helper.sendPrivateMsg(infos[name].owner_id, '今日打卡失败，请手动打卡');
  }
}

function groupListener(data: GroupMessageEventData) {
  const {raw_message, group_id, user_id} = data;
  if (group_id && groupID !== group_id) return;
  check(user_id, raw_message, helper.sendMsg.bind(helper));
}

function privateListener(data: PrivateMessageEventData) {
  const {raw_message, user_id} = data;
  check(user_id, raw_message, helper.sendPrivateMsg.bind(helper, user_id));
}

function install() {
  bot.on('message.group', groupListener);
  bot.on('message.private', privateListener);
  scheduleJob('5 0 0 * * *', () => {
    if (clockinSwitch) {
      for (const name in infos) {
        healthClockin(name);
      }
    }
  });
}

const plugin: Plugin = {
  name: 'weCqupt',
  install,
};

export default plugin;
