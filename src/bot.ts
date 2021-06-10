import {createClient} from 'oicq';
import Helper from './Helper';
import {config} from 'dotenv';
config();
export const account = parseInt(process.env.ACCOUNT!);
export const password = process.env.PASS_WORD!;
export const groupID = parseInt(process.env.GROUP_ID!);

function createBot() {
  const bot = createClient(account);
  //监听并输入滑动验证码ticket(同一设备只需验证一次)
  bot.on('system.login.slider', () => {
    process.stdin.once('data', input => {
      bot.sliderLogin(input as unknown as string);
    });
  });

  //监听设备锁验证(同一设备只需验证一次)
  bot.on('system.login.device', () => {
    bot.logger.info('验证完成后敲击Enter继续..');
    process.stdin.once('data', () => {
      bot.login();
    });
  });
  bot.login(password);
  return bot;
}

export const bot = createBot();
export const helper = new Helper(bot, groupID);
