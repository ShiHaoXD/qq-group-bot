import {createAxiosInstance} from '../../../shared/http';
import {CommonRes, genTokenHeader} from './common';
import {getToken, TokenReq} from './login';
const baseURL = 'https://be-prod.redrock.cqupt.edu.cn/magipoke-intergral/QA';

const {post} = createAxiosInstance(baseURL);

export interface CheckInCommonReq {}

export interface CheckInRes {
  status: number;
  info: string;
}

export interface GetCheckInStatusRes {
  integral: number;
  check_in_days: number;
  is_check_today: number;
  week_info: string;
  rank: number;
  percent: string;
  can_check_in: boolean; // 指当日是否可签到（寒暑假不可签到）
}

export const checkIn = async (info: TokenReq) => {
  const token = await getToken(info);
  return post<CheckInRes>(
    '/Integral/checkIn',
    {},
    {headers: {...genTokenHeader(token)}}
  );
};

export const getCheckInStatus = async (info: TokenReq) => {
  const token = await getToken(info);
  return post<CommonRes<GetCheckInStatusRes>>(
    '/User/getScoreStatus',
    {},
    {headers: {...genTokenHeader(token)}}
  );
};
