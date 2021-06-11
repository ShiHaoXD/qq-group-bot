export interface replyKeyword {
  readonly regex: RegExp;
  readonly reply: string;
}

export interface Food {
  readonly type: string;
  readonly restaurants: string[];
}

export interface Plugin {
  readonly install: () => void;
  readonly name?: string;
}

export interface ZscyAccount {
  readonly stunum: string; // 账号
  readonly idnum: string; // 密码
}
