import {getNowTimestamp} from '../../shared/date';
import {createAxiosInstance} from '../../shared/http';

const baseURL = 'https://we.cqupt.edu.cn/api/lxsp';
const headers = {
  'User-Agent':
    'Mozilla/5.0 (Linux; Android 6.0.1; MuMu Build/V417IR; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.100 Safari/537.36 MMWEBID/4360 MicroMessenger/7.0.22.1820(0x27001636) Process/appbrand2 WeChat/arm32 Weixin Android Tablet NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
  'content-type': 'application/json',
};

const {post} = createAxiosInstance(baseURL, headers);

export const apply = (data: any) =>
  post('/post_lxsp_spxx_test0914.php', {
    key: Buffer.from(JSON.stringify(data)).toString('base64'),
  });

export const leave = (data: any) =>
  post('/post_lxsp_sm_test20210311.php', {
    key: Buffer.from(JSON.stringify(data)).toString('base64'),
  });

export const getList = (data: any) =>
  post('/get_lxsp_list_gxw20210316.php', {
    key: Buffer.from(
      JSON.stringify({
        ...data,
        page: '1',
        timestamp: getNowTimestamp(),
      })
    ).toString('base64'),
  });
