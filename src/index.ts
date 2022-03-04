import {config} from 'dotenv';
import {createBot} from './bot';
import {BanForRepeat} from './plugins/banForRepeat';
import {Greet} from './plugins/greet';
import {Jwzx} from './plugins/jwzx';
import {News} from './plugins/news';
import {RecallKeyword} from './plugins/recallKeyword';
import {ReplyKeyword} from './plugins/replyKeyword';
import {WeatherForecast} from './plugins/weather';
import {WeCqupt} from './plugins/weCqupt';
import {WhatToEat} from './plugins/whatToEat';
import {HandleCqupt} from './plugins/zscy';

config();

export const account = parseInt(process.env.ACCOUNT!);
export const password = process.env.PASS_WORD!;
export const groupID = parseInt(process.env.GROUP_ID!);
const bot = createBot(account, password, groupID);

bot.use(Greet);
bot.use(ReplyKeyword);
bot.use(BanForRepeat);
bot.use(RecallKeyword);
bot.use(WeCqupt);
bot.use(News);
bot.use(Jwzx);
bot.use(WeatherForecast);
bot.use(WhatToEat);
bot.use(HandleCqupt);
