import type {Client} from 'oicq';
import type Helper from '../Helper';

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
  readonly qq: number; // QQ 号
  readonly stuNum: string; // 账号
  readonly idNum: string; // 密码
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

// export const isRejected = (
//   input: PromiseSettledResult<unknown>
// ): input is PromiseRejectedResult => input.status === 'rejected';

// export const isFulfilled = <T>(
//   input: PromiseSettledResult<T>
// ): input is PromiseFulfilledResult<T> => input.status === 'fulfilled';
