import {plugins} from './plugins';
function installPlugin() {
  plugins.forEach(plugin => {
    plugin.install();
  });
}

installPlugin();
