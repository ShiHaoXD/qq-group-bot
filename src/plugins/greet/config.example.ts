import {defineConfig} from '../../shared/utils';
import type {Config} from './types/config';

export default defineConfig<Config>({
  reply: {
    '{QQ号}': ['{回复1}', '{回复2}'],
  },
});
