import {GroupRole} from 'oicq';

import {Food} from './interface';

export const genWhatToEat = (foods: Food[]) => {
  const index = Math.floor(Math.random() * foods.length);
  const food = foods[index];
  const restaurantsIndex = Math.floor(Math.random() * food.restaurants.length);
  return `${food.type} ${food.restaurants[restaurantsIndex]}`;
};

export const genBaiduSearchUrl = (keyword: string) =>
  `https://www.baidu.com/s?wd=${encodeURI(keyword)}`;

export const canRecall = (role: GroupRole) => {
  return role === 'member';
};
