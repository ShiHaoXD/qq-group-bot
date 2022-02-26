import dayjs from 'dayjs';

export const getTodayDate = () => dayjs().format('YYYY-MM-DD');

export const getNowTimestamp = () => dayjs().unix();

export const getNowTimeString = () => dayjs().format('YYYY-MM-DD HH:mm:ss');

// 获取北京时间
export const getLocalTime = () => new Date(Date.now() + 8 * 60 * 60 * 1000);
