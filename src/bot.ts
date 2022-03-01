import {Client, createClient} from 'oicq';
import Helper from './Helper';
import {Plugin} from './shared/types';

type usePluginFn = (plugin: Plugin) => void;

export interface Bot {
  client: Client;
  helper: Helper;
  use: usePluginFn;
}

export function createBot(account: number, password: string, groupID: number) {
  const client = createClient(account);
  //监听并输入滑动验证码ticket(同一设备只需验证一次)
  client.on('system.login.slider', () => {
    process.stdin.once('data', input => {
      client.submitSlider(input as unknown as string);
    });
  });

  //监听设备锁验证(同一设备只需验证一次)
  client.on('system.login.device', () => {
    client.logger.info('验证完成后敲击Enter继续..');
    process.stdin.once('data', () => {
      client.login();
    });
  });

  client.login(password);

  const helper = new Helper(client, groupID);

  const use: usePluginFn = (plugin: Plugin) => {
    helper.plugins.push(plugin);
  };

  client.on('system.online', () => {
    helper.plugins.forEach(plugin => plugin.install(client, helper));
    helper.sendMsg('bot 启动成功');
  });

  return {
    use,
  };
}
