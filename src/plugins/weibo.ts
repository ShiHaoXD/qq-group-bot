import axios from "axios"
import cheerio from "cheerio"

import { getNowTime } from "../shared"

const API = "https://s.weibo.com/top/summary?cate=realtimehot"
export const getWeiboHotNews = async () => {
  const result: string[] = []
  const { data } = await axios.get(API)
  const $ = cheerio.load(data)
  $(".list_a li span").each((index, ele) => {
    if (index < 10) result.push(`${index + 1}、${$(ele).clone().children().remove().end().text()}`) //只获取当前元素文字 不获取子元素文字
  })
  return `${getNowTime()}\n${result.join("\n")}`
}
