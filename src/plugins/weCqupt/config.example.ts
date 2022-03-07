import {defineConfig} from '../../shared/utils';
import type Config from './types/config';

export default defineConfig<Config>({
  infos: {
    申请人姓名: {
      info: {
        xh: '学号',
        name: '姓名',
        xy: '学院',
        openid: 'we重邮的openid',
        address: '健康打卡要填的详细地址，不使用健康打卡可以不填',
        gender: '性别',
      },
      owner_id: 123456, // 该名学生的 QQ 号，只有用该 QQ 号可以申请
    },
  },
});
