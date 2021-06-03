import { GroupRole } from "oicq"
import { Food } from "./interface"

export const genWhatToEat = (foods: Food[]) => {
  const index = Math.floor(Math.random() * foods.length)
  const food = foods[index]
  const restaurantsIndex = Math.floor(Math.random() * food.restaurants.length)
  return `${food.type} ${food.restaurants[restaurantsIndex]}`
}

export const genBaiduSearchUrl = (keyword: string) =>
  `https://www.baidu.com/s?wd=${encodeURI(keyword)}`

export const canRecall = (role: GroupRole) => {
  return role === "member"
}

export const isPromise = <T = any>(val: any): val is Promise<T> =>
  !!val && (typeof val === "object" || typeof val === "function") && typeof val.then === "function"

export const getNowTime = () =>
  `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString("chinese", {
    hour12: false,
  })}`
