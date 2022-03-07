import type Helper from '../../Helper';
import {getLocalTime, getNowTimestamp} from '../../shared/date';
import {dynamicImport, getConfigFileDir} from '../../shared/utils';
import {clockin, getClockinStatus, getLocation} from './api';
import type Config from './types/config';
const {infos}: Config = dynamicImport(getConfigFileDir(__dirname)).default;

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

const healthClockin = async (name: string, helper: Helper) => {
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
};

export default healthClockin;
