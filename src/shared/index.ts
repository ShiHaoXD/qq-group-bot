export const getTodayDate = () =>
  new Date()
    .toLocaleDateString()
    .split("/")
    .map(e => e.padStart(2, "0"))
    .join("-")

export const isPromise = <T = any>(val: any): val is Promise<T> =>
  !!val && (typeof val === "object" || typeof val === "function") && typeof val.then === "function"

export const getNowTime = () =>
  `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString("chinese", {
    hour12: false,
  })}`
