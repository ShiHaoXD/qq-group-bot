import {GroupMessageEvent, PrivateMessageEvent} from 'oicq';
import Helper from '../../Helper';
import {Food, installFn, Plugin} from '../../shared/types';
import {foods, neverEatFoods} from './config';
function genWhatToEat(foods: Food[]) {
  const index = Math.floor(Math.random() * foods.length);
  const food = foods[index];
  const restaurantsIndex = Math.floor(Math.random() * food.restaurants.length);
  return `${food.type} ${food.restaurants[restaurantsIndex]}`;
}

function check(msg: string, sender: (msg: string) => void) {
  const whatToEatRegex = /^吃什么$/;
  const whatNeverEatRegex = /^什么没吃过$/;
  if (whatToEatRegex.test(msg)) {
    sender(genWhatToEat(foods));
  } else if (whatNeverEatRegex.test(msg)) {
    sender(genWhatToEat(neverEatFoods));
  }
}

function groupListener(data: GroupMessageEvent, helper: Helper) {
  const {raw_message, group_id} = data;
  if (group_id && helper.groupID !== group_id) return;
  check(raw_message, helper.sendMsg.bind(helper));
}

function privateListener(data: PrivateMessageEvent, helper: Helper) {
  const {raw_message, from_id} = data;
  check(raw_message, helper.sendPrivateMsg.bind(helper, from_id));
}

const install: installFn = (client, helper) => {
  client.on('message.group', data => groupListener(data, helper));
  client.on('message.private', data => privateListener(data, helper));
};

export const WhatToEat: Plugin = {
  name: '吃什么',
  install,
};
