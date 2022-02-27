import {
  getNowTimestamp,
  getNowTimeString,
  getTimeStringFromHour,
} from '../../shared/date';
import {apply, getList, leaveOrBack} from './api';
import {infos} from './config.example';
import {LEAVE_OR_BACK_TYPE} from './constants';

const initialInfo = {
  nj: '2019',
  qjsy: '1',
  wcxxdd: '1',
  wcmdd: '重庆市,重庆市,南岸区',
  qjlx: '市内当日离返校',
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
    yjfxsj: getTimeStringFromHour(3),
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
    location: type === LEAVE_OR_BACK_TYPE.LEAVE ? '崇文门出口5' : '崇文门入口2',
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

  const requestData = {
    ...chu,
    ...userInfo,
    log_id: listData.data.result[0].log_id,
  };

  const {data} = await leaveOrBack(requestData);
  if (data.status === 200) {
    return `${type}成功`;
  } else {
    return `${type}失败\n请求数据：${requestData}\n返回数据${data}`;
  }
}
