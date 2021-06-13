import {createAxiosInstance} from '../../shared/http';

const baseURL = 'https://be-prod.redrock.team/magipoke-jwzx';

const headers = {
  'content-type': 'application/json',
};

const {get} = createAxiosInstance(baseURL, headers);

export const getJwzxNews = (page: number) => get('/jwNews/list?page=1', {page});
