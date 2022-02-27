// import {expect, test} from 'vitest';
// import {
//   getNowTimestamp,
//   getNowTimeString,
//   getTimeStringFromHour,
// } from '../../../shared/date';
// import {apply, getList, leaveOrBack} from '../api';
// import {infos} from '../config.private';

// const user = infos['xxx'];

// test('getList', async () => {
//   const {data} = await getList({
//     openid: user.info.openid,
//     xh: user.info.xh,
//     timestamp: getNowTimestamp(),
//   });

//   const result = data.data.result;
//   // expect(result).not.toBeNull();
//   console.log(result[0]);
// });

// test('apply', async () => {
//   // const {data} = await apply({
//   //   openid: user.info.openid,
//   //   xh: user.info.xh,
//   //   name: user.info.name,
//   //   xy: user.info.xy,
//   //   nj: '2019',
//   //   qjsy: '1',
//   //   wcxxdd: '1',
//   //   wcmdd: '重庆市,重庆市,南岸区',
//   //   qjlx: '市内3小时离返校',
//   //   beizhu: '',
//   //   yjfxsj: getNowTimeString(),
//   //   wcrq: getTimeStringFromHour(3),
//   //   timestamp: getNowTimestamp(),
//   // });
//   // console.log(data);
//   // expect(data).toBe(200);
// });

// test('leave', async () => {
//   const {data} = await leaveOrBack({
//     openid: user.info.openid,
//     xh: user.info.xh,
//     type: '入校',
//     location: '崇文门入口5',
//     latitude: '',
//     longitude: '',
//     timestamp: getNowTimestamp(),
//     log_id: '4699189',
//     version: '1.1',
//   });
//   console.log(data);
// });
