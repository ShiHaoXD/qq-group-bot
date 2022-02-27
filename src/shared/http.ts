import axios, {AxiosResponse} from 'axios';

export const createAxiosInstance = (baseURL: string, headers: any) => {
  const instance = axios.create({
    baseURL,
    headers,
    timeout: 6000,
  });

  async function get<T>(
    url: string,
    params: any = {}
  ): Promise<AxiosResponse<T>> {
    try {
      return instance.get(url, {params});
    } catch (error) {
      throw new Error(error + '');
    }
  }

  async function post<T>(
    url: string,
    data: any = {},
    config: any = {}
  ): Promise<AxiosResponse<T>> {
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
