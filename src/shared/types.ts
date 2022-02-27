import {Client} from 'oicq';
import Helper from '../Helper';

export interface replyKeyword {
  readonly regex: RegExp;
  readonly reply: string;
}

export interface Food {
  readonly type: string;
  readonly restaurants: string[];
}

export type installFn = (client: Client, helper: Helper) => void;

export interface Plugin {
  readonly install: (client: Client, helper: Helper) => void;
  readonly name?: string;
}

export interface ZscyAccount {
  readonly stunum: string; // 账号
  readonly idnum: string; // 密码
}

export interface StudentInfo {
  [name: string]: {
    info: {
      xh: string;
      name: string;
      xy: string;
      openid: string;
      address: string;
      gender: string;
    };
    owner_id: number;
  };
}
