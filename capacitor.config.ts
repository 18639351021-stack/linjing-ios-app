import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.linjing.docai.zjzs.ios',
  appName: '邻井助手整合版',
  webDir: 'dist',
  bundledWebRuntime: false,
  ios: {
    contentInset: 'automatic'
  }
};

export default config;
