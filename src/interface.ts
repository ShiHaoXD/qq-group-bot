export interface replyKeyword {
  keyword: RegExp | string
  reply: string | ((arg?: any) => string)
}

export interface Food {
  type: string
  restaurants: string[]
}
