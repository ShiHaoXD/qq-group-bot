import axios from 'axios';
import {GroupMessageEventData, PrivateMessageEventData} from 'oicq';

import {bot, helper, groupID} from '../../bot';
import {getNowTimestamp, getTodayDate} from '../../shared/date';
import {Plugin} from '../../shared/types';
import {infos} from './config.private';

const applyAPI = 'https://we.cqupt.edu.cn/api/lxsp/post_lxsp_spxx_test0914.php';

const options = {
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Linux; Android 6.0.1; MuMu Build/V417IR; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.100 Safari/537.36 MMWEBID/4360 MicroMessenger/7.0.22.1820(0x27001636) Process/appbrand2 WeChat/arm32 Weixin Android Tablet NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
    'content-type': 'application/json',
  },
};

const initalInfo = {
  nj: '2019',
  qjsy: '1',
  wcxxdd: '1',
  wcmdd: '重庆市,重庆市,南岸区',
  qjlx: '市内当日离返校',
  beizhu: '',
};

const applyLeaveSchool = async (name: string) => {
  if (Object.keys(infos).includes(name)) {
    const requestData = {
      ...infos[name],
      ...initalInfo,
      yjfxsj: getTodayDate(),
      wcrq: getTodayDate(),
      timestamp: getNowTimestamp(),
    };
    const {data} = await axios.post(
      applyAPI,
      {
        key: Buffer.from(JSON.stringify(requestData)).toString('base64'),
      },
      options
    );
    if (data.status === 200) {
      return '申请成功';
    } else {
      return `申请失败\n请求数据：${requestData}\n返回数据${data}`;
    }
  } else {
    return '没有你的数据 请联系管理员添加';
  }
};

async function check(msg: string, sender: any) {
  const regex = /申请 [\S]*/;
  if (regex.test(msg)) {
    const name = msg.split(' ')[1];
    sender(await applyLeaveSchool(name));
  }
}

function groupListener(data: GroupMessageEventData) {
  const {raw_message, group_id} = data;
  if (group_id && groupID !== group_id) return;
  check(raw_message, helper.sendMsg);
}

function privateListener(data: PrivateMessageEventData) {
  const {raw_message, user_id} = data;
  check(raw_message, helper.sendPrivateMsg.bind(helper, user_id));
}

function install() {
  bot.on('message.group', groupListener);
  bot.on('message.private', privateListener);
}

const plugin: Plugin = {
  name: 'weCqupt',
  install,
};

export default plugin;
