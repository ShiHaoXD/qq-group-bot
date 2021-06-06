export interface replyKeyword {
  keyword: RegExp | string;
  reply: string | ((arg?: any) => string | Promise<string>);
  interactive?: boolean;
}

export interface Food {
  type: string;
  restaurants: string[];
}
