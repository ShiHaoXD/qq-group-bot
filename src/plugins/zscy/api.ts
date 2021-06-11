import {createAxiosInstance} from '../../shared/http';
import qs from 'qs';
const baseURL = 'https://be-prod.redrock.team/magipoke-intergral/QA';
const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

const {post} = createAxiosInstance(baseURL, headers);

export const checkIn = (data: any) =>
  post('/Integral/checkIn', qs.stringify(data));

export const getCheckInStatus = (data: any) =>
  post('/User/getScoreStatus', qs.stringify(data));
