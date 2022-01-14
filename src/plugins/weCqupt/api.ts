import {createAxiosInstance} from '../../shared/http';
import {json2base64} from '../../shared/utils';
import axios from 'axios';

const baseURL = 'https://we.cqupt.edu.cn/api';
const headers = {
  'User-Agent':
    'Mozilla/5.0 (Linux; Android 6.0.1; MuMu Build/V417IR; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.100 Safari/537.36 MMWEBID/4360 MicroMessenger/7.0.22.1820(0x27001636) Process/appbrand2 WeChat/arm32 Weixin Android Tablet NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
  'content-type': 'application/json',
};

const {post} = createAxiosInstance(baseURL, headers);

type studentInfo = {
  nj: string;
  name: string;
  xy: string;
  xh: string;
};

type applyBaseParams = {
  qjsy: string;
  wcxxdd: string;
  wcmdd: string;
  qjlx: string;
  beizhu: string;
};

type baseParams = {
  timestamp: number;
  openid: string;
};

type ApplyParams = {
  yjfxsj: string;
  wcrq: string;
} & studentInfo &
  applyBaseParams &
  baseParams;

type GetListParams = {
  page?: string;
  xh: string;
} & baseParams;

type LeaveOrBackParams = {
  type: string;
  location: string;
  latitude: string;
  longitude: string;
  log_id: string;
  version: string;
  xh: string;
} & baseParams;

export const apply = (data: ApplyParams) =>
  post('/lxsp_new/post_lxsp_spxx.php', {
    key: json2base64(data),
  });

export const getList = (data: GetListParams) =>
  post('/lxsp_new/get_lxsp_student_list.php', {
    key: json2base64(data),
  });

export const leaveOrBack = (data: LeaveOrBackParams) =>
  post('/lxsp_new/post_lxsp_sm.php`', {
    key: json2base64(data),
  });

export const getClockinStatus = (data: any) =>
  post('/mrdk/get_mrdk_flag.php', {
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
  post('/mrdk/post_mrdk_info.php', {
    key: json2base64(data),
  });
