import {GroupMessageEventData, PrivateMessageEventData} from 'oicq';
import {bot, helper, groupID} from '../../bot';
import {Food, Plugin} from '../../shared/types';
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

function groupListener(data: GroupMessageEventData) {
  const {raw_message, group_id} = data;
  if (group_id && groupID !== group_id) return;
  check(raw_message, helper.sendMsg.bind(helper));
}

function privateListener(data: PrivateMessageEventData) {
  const {raw_message, user_id} = data;
  check(raw_message, helper.sendPrivateMsg.bind(helper, user_id));
}

function install() {
  bot.on('message.group', groupListener);
  bot.on('message.private', privateListener);
}

const plugin: Plugin = {
  name: 'whatToEat',
  install,
};

export default plugin;
