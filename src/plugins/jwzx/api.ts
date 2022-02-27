import {createAxiosInstance} from '../../shared/http';

const baseURL = 'https://be-prod.redrock.cqupt.edu.cn/magipoke-jwzx';

const headers = {
  'content-type': 'application/json',
};

const {get} = createAxiosInstance(baseURL, headers);

export const getJwzxNews = (page: number) =>
  get<any>('/jwNews/list?page=1', {page});
