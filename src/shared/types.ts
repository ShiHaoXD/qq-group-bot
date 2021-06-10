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
