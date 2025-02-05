import type {Client} from 'oicq';
import type Helper from '../Helper';

export interface Food {
  readonly type: string;
  readonly restaurants: string[];
}

export type installFn = (client: Client, helper: Helper) => void;

export interface Plugin {
  readonly install: (client: Client, helper: Helper) => void;
  readonly name?: string;
}

// export const isRejected = (
//   input: PromiseSettledResult<unknown>
// ): input is PromiseRejectedResult => input.status === 'rejected';

// export const isFulfilled = <T>(
//   input: PromiseSettledResult<T>
// ): input is PromiseFulfilledResult<T> => input.status === 'fulfilled';
