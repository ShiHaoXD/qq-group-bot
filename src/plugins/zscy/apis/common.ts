export const genTokenHeader = (token: string) => {
  return {
    authorization: `Bearer ${token}`,
  };
};

export interface CommonRes<T> {
  status: number;
  info: string;
  data: T;
}

export const SUCCESS_STATUS = 10000;
