import {createAxiosInstance} from '../../shared/http';
import {json2base64} from '../../shared/utils';
import axios from 'axios';
import {LEAVE_OR_BACK_TYPE} from './constants';

const baseURL = 'https://we.cqupt.edu.cn/api';
const headers = {
  'User-Agent':
    'Mozilla/5.0 (Linux; Android 6.0.1; MuMu Build/V417IR; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.100 Safari/537.36 MMWEBID/4360 MicroMessenger/7.0.22.1820(0x27001636) Process/appbrand2 WeChat/arm32 Weixin Android Tablet NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
  'content-type': 'application/json',
};

const {post} = createAxiosInstance(baseURL, headers);

export type BaseRes<T> = {
  status: number;
  message: string;
  data: T;
};

export type studentInfo = {
  nj: string;
  name: string;
  xy: string;
  xh: string;
};

export type applyBaseParams = {
  qjsy: string;
  wcxxdd: string;
  wcmdd: string;
  qjlx: string;
  beizhu: string;
};

export type baseParams = {
  timestamp: number;
  openid: string;
};

export type ApplyReq = {
  yjfxsj: string;
  wcrq: string;
  // sfly: string;
} & studentInfo &
  applyBaseParams &
  baseParams;

export type ApplyRes = BaseRes<null>;

export type GetListReq = {
  page?: string;
  xh: string;
} & baseParams;

export type GetListRes = BaseRes<GetListData>;

export interface GetListData {
  length: string;
  result: GetListItem[];
}

export interface GetListItem {
  log_id: string;
  xh: string;
  name: string;
  xy: string;
  nj: string;
  wcmdd: string; // 外出目的地
  wcxxdd: string; // 外出详细地点
  wcrq: string; // 外出日期
  qjsy: string; // 请假事由
  yjfxsj: string; // 预计返校时间
  spfdy: string | null; // 审批辅导员
  fdyspsj: string | null; // 辅导员审批时间
  fdyyj: string | null; // 辅导员意见
  lczt: string; // 流程状态
  lcztdm: string; // 流程状态代码 5 结束
  lxsmsj: string; // 离校扫码时间
  lxsmdd: string; // 离校扫码地点
  rxsmsj: string; // 入校扫码时间
  rxsmdd: string; // 入校扫码地点
  sfaxfx: string; // 是否按时返校
  gxsj: string; // 更新时间
  gxcz: string; // 更新操作
  bz: string; // 备注
  qjlx: string; // 请假类型
  latitude: string; // 纬度
  longitude: string; // 经度
  sflx: string | null; // 是否离校
  logid_fk: string;
  yclx: string; // 延迟类型
}

export type LeaveOrBackReq = {
  type: LEAVE_OR_BACK_TYPE;
  location: string;
  log_id: string;
  xh: string;
} & baseParams;

export type LeaveOrBackRes = BaseRes<LeaveOrBackData>;

export interface LeaveOrBackData {
  time: string;
  type: string;
  location: string;
  num: number;
}

export const apply = (data: ApplyReq) =>
  post<ApplyRes>('/lxsp_new/post_lxsp_spxx.php', {
    key: json2base64(data),
  });

export const getList = (data: GetListReq) =>
  post<GetListRes>('/lxsp_new/get_lxsp_student_list.php', {
    key: json2base64(data),
  });

export const leaveOrBack = (data: LeaveOrBackReq) =>
  post<LeaveOrBackRes>('/lxsp_new/post_lxsp_sm.php', {
    key: json2base64({version: '1.1', longitude: '', latitude: '', ...data}),
  });

export const getClockinStatus = (data: any) =>
  post<any>('/mrdk/get_mrdk_flag.php', {
    key: json2base64(data),
  });

export const getLocation = (address: string) =>
  axios.get('https://apis.map.qq.com/ws/geocoder/v1/', {
    params: {
      address,
      key: 'PULBZ-BSEWU-MAEVV-2IAJR-ZCAS3-53F4O',
    },
  });

export const clockin = (data: any) =>
  post<any>('/mrdk/post_mrdk_info.php', {
    key: json2base64(data),
  });
