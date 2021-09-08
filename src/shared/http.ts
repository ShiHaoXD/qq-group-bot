import axios from 'axios';

export const createAxiosInstance = (baseURL: string, headers: any) => {
  const instance = axios.create({
    baseURL,
    headers,
    timeout: 6000,
  });

  async function get(url: string, params: any = {}) {
    try {
      return instance.get(url, {params});
    } catch (error) {
      throw new Error(error + '');
    }
  }

  async function post(url: string, data: any = {}, config: any = {}) {
    try {
      return instance.post(url, data, config);
    } catch (error) {
      throw new Error(error + '');
    }
  }
  return {
    get,
    post,
  };
};
