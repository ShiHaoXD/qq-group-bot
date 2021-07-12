import {getNowTimestamp} from '../../shared/date';
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

export const apply = (data: any) =>
  post('/lxsp/post_lxsp_spxx_test0914.php', {
    key: json2base64(data),
  });

export const leave = (data: any) =>
  post('/lxsp/post_lxsp_sm_test20210311.php', {
    key: json2base64(data),
  });

export const getList = (data: any) =>
  post('/lxsp/get_lxsp_list_gxw20210316.php', {
    key: json2base64({
      ...data,
      page: '1',
      timestamp: getNowTimestamp(),
    }),
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
