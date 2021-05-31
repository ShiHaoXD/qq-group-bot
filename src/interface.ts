export interface Keyword {
  regex: RegExp
  reply: string | ((arg?: any) => string)
}

export interface Food {
  type: string
  restaurants: string[]
}
