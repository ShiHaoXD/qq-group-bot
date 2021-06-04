import axios from "axios"

import { getTodayDate } from "../shared"

const applyAPI = "https://we.cqupt.edu.cn/api/lxsp/post_lxsp_spxx_test0914.php"

const options = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 6.0.1; MuMu Build/V417IR; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/52.0.2743.100 Safari/537.36 MMWEBID/4360 MicroMessenger/7.0.22.1820(0x27001636) Process/appbrand2 WeChat/arm32 Weixin Android Tablet NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android",
    "content-type": "application/json",
  },
}

const initalInfo = {
  nj: "2019",
  qjsy: "1",
  wcxxdd: "1",
  wcmdd: "重庆市,重庆市,南岸区",
  yjfxsj: getTodayDate(),
  wcrq: getTodayDate(),
  qjlx: "市内当日离返校",
  beizhu: "",
  timestamp: Math.ceil(+new Date() / 1000),
}

const infos: { [name: string]: any } = {
  /**
   * example 
  名字: {
    xh: "学号",
    name: "名字",
    xy: "学院",
    nj: "年级",
    openid: "openID",
    wcmdd: "地址",
    qjsy: "随便填", 
    wcxxdd: "随便填",
    wcrq: new Date().toLocaleDateString().split("/").join("-"), 
    qjlx: "市内当日离返校",
    yjfxsj: new Date().toLocaleDateString().split("/").join("-"),
    beizhu: "",
    timestamp: Math.ceil(+new Date() / 1000),
  },
   */
}

export const applyLeaveSchool = async (name: string) => {
  if (Object.keys(infos).includes(name)) {
    const { data } = await axios.post(
      applyAPI,
      {
        key: Buffer.from(JSON.stringify({ ...infos[name], ...initalInfo })).toString("base64"),
      },
      options,
    )
    if (data.status === 200) {
      return "申请成功"
    } else {
      return "申请失败"
    }
  } else {
    return "没有你的数据 请联系管理员添加"
  }
}
