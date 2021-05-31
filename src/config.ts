import { genWhatToEat } from "./utils"

interface IKeywords {
  regex: RegExp
  reply: string | ((arg?: any) => string)
}

export const keywords: IKeywords[] = [
  {
    regex: /\S*[段琦]\S*/,
    reply: "[CQ:image,file=9b84db64514d694943dba06d899a52ad14467-284-324.jpg]",
  },
  {
    regex: /\S*[吴世浩]\S*/,
    reply: "吴世浩？肥吴罢了",
  },
  {
    regex: /吃什么/,
    reply: genWhatToEat,
  },
]

export const foods = [
  "凉面",
  "华莱士",
  "鸡公煲",
  "串串",
  "小面",
  "粉",
  "大盘鸡",
  "豆花牛肉",
  "烤鱼",
  "烧烤",
  "麻辣烫",
  "干锅",
  "火锅",
  "食堂",
  "煎饼",
  "抄手",
  "饺子",
  "大米小面",
]
