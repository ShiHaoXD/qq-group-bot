export const getTodayDate = () =>
  new Date()
    .toLocaleDateString('zh-CN')
    .split('/')
    .map(e => e.padStart(2, '0'))
    .join('-');

export const getNowTimestamp = () => Math.round(+new Date() / 1000);

export const getNowTimeString = () =>
  `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString(
    'chinese',
    {
      hour12: false,
    }
  )}`;
