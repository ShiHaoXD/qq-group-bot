import {createAxiosInstance} from '../../shared/http';
import {stringify} from 'qs';
const baseURL = 'https://be-prod.redrock.cqupt.edu.cn/magipoke-intergral/QA';
const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

const {post} = createAxiosInstance(baseURL, headers);

export const checkIn = (data: any) =>
  post<any>('/Integral/checkIn', stringify(data));

export const getCheckInStatus = (data: any) =>
  post<any>('/User/getScoreStatus', stringify(data));
