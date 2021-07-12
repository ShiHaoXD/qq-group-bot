import axios from 'axios';

export const getWeather = () =>
  axios.get(
    'https://devapi.qweather.com/v7/weather/24h?key=b6604b9d2e8d41ba90a5c2c6ea35a3b7&location=106.36,29.32'
  );
