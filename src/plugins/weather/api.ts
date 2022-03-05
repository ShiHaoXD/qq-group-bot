import {createAxiosInstance} from '../../shared/http';

const {get} = createAxiosInstance(
  'https://devapi.qweather.com/v7/weather',
  {},
  {retry: true}
);

export interface GetWeatherRes {
  code: string;
  updateTime: string;
  hourly: HourlyData[];
}

export interface HourlyData {
  fxTime: string; // 预报时间
  temp: string; // 温度
  text: string; // 天气状况
}

// 完整接口文档：https://dev.qweather.com/docs/api/weather/weather-hourly-forecast/

export const getWeather = () =>
  get<GetWeatherRes>(
    '/24h?key=b6604b9d2e8d41ba90a5c2c6ea35a3b7&location=106.36,29.32'
  );
