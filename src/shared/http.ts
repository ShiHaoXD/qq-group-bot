import type {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import axios from 'axios';
import axiosRetry from 'axios-retry';

export interface createAxiosInstanceOptions {
  retry?: boolean;
  retryTimes?: number;
}

export const createAxiosInstance = (
  baseURL = '',
  headers: Record<string, any> = {},
  options: createAxiosInstanceOptions = {}
) => {
  const instance = axios.create({
    baseURL,
    headers,
    timeout: 6000,
  });

  if (options.retry) {
    axiosRetry(instance, {
      retries: options.retryTimes ?? 3,
      retryDelay: axiosRetry.exponentialDelay,
    });
  }

  async function get<T>(
    url: string,
    params: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    try {
      return await instance.get(url, {params, ...config});
    } catch (error) {
      const {
        code,
        message,
        config: {baseURL, url},
      } = error as AxiosError;
      throw new Error(`[GET ${baseURL}${url}] ${code} ${message}`);
    }
  }

  async function post<T>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> {
    try {
      return await instance.post(url, data, config);
    } catch (error) {
      const {
        code,
        message,
        config: {baseURL, url},
      } = error as AxiosError;
      throw new Error(`[POST ${baseURL}${url}] ${code} ${message}`);
    }
  }
  return {
    get,
    post,
  };
};
