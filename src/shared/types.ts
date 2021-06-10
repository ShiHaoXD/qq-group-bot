export interface replyKeyword {
  regex: RegExp;
  reply: string;
}

export interface Food {
  type: string;
  restaurants: string[];
}

export interface Plugin {
  install: () => void;
  name?: string;
}
