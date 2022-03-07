import {
  getNowTimestamp,
  getNowTimeString,
  getTodayLastTimeString,
} from '../../shared/date';
import {dynamicImport, getConfigFileDir} from '../../shared/utils';
import type {LeaveOrBackReq} from './api';
import {apply, getList, leaveOrBack} from './api';
import {LEAVE_OR_BACK_TYPE} from './constants';

import type Config from './types/config';
const {infos}: Config = dynamicImport(getConfigFileDir(__dirname));

const initialInfo = {
  nj: '2019',
  qjsy: '1',
  wcxxdd: '1',
  wcmdd: '重庆市,重庆市,南岸区',
  qjlx: '市内3小时离返校',
  beizhu: '',
};

export async function applyLeaveSchool(name: string) {
  const {xh, xy, openid} = infos[name].info;
  const requestData = {
    xh,
    name,
    xy,
    openid,
    ...initialInfo,
    yjfxsj: getTodayLastTimeString(),
    wcrq: getNowTimeString(),
    timestamp: getNowTimestamp(),
  };
  const {data} = await apply(requestData);

  if (data.status === 200) {
    return '申请成功';
  } else {
    return data.message;
  }
}

export async function leaveOrBackSchool(
  name: string,
  type: LEAVE_OR_BACK_TYPE
) {
  const {openid, xh} = infos[name].info;
  const chu = {
    type: type,
    location:
      type === LEAVE_OR_BACK_TYPE.LEAVE ? '崇文门出口4' : '崇文门侧门入口1',
    timestamp: getNowTimestamp(),
  };
  const userInfo = {
    openid,
    xh,
  };
  const {data: listData} = await getList({
    ...userInfo,
    timestamp: getNowTimestamp(),
  });

  const requestData: LeaveOrBackReq = {
    version: '1.1',
    latitude: '',
    longitude: '',
    ...chu,
    ...userInfo,
    log_id: listData.data.result[0].log_id,
  };

  const {data} = await leaveOrBack(requestData);
  if (data.status === 200) {
    return `${type}成功`;
  } else {
    return `${type}失败 ${data.message}`;
  }
}
