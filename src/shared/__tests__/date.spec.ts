import {expect, test} from 'vitest';
import {getNowTimestamp, getNowTimeString, getTodayDate} from '../date';

test('getTodayDate', () => {
  expect(getTodayDate()).eq(
    new Date()
      .toLocaleDateString('zh-CN')
      .split('/')
      .map(e => e.padStart(2, '0'))
      .join('-')
  );
});

test('getNowTimestamp', () => {
  expect(getNowTimestamp()).eq(Math.floor(+new Date() / 1000));
});

test('', () => {
  // example 2022-02-27 00:39:00
  const timeStringReg =
    /^\d{1,4}(-)(1[0-2]|0?[1-9])\1(0?[1-9]|[1-2]\d|30|31) (?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;
  expect(timeStringReg.test(getNowTimeString())).toBeTruthy();
});
