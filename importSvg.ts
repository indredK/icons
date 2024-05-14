import Util from './xzUtils/IconTransf';

Util({
  // 阿里icon地址，在 iconfont
  deviceUrl: '//at.alicdn.com/t/c/font_4543986_tslco4c855d.js',
  channelUrl: '//at.alicdn.com/t/c/font_4543988_6wxv6m01fp.js',
  // 阿里的iconfont，只用来存放系统图标
  systemUrl: '//at.alicdn.com/t/c/font_4543991_6gjc67lcjh6.js',
  // 每次更新以后记得把它的版本版本号更新，三个都要更新，否则会导致CI发布失败
  'npm-version': {
    // 对应packages里面的文件夹名字
    // "icons-angular": "1.0.1",
    // "icons-vue": "1.0.1",
    'icons-svg': '1.1.6',
    'icons-react': '1.1.6',
    'icons-react-native': '1.1.6',
  },
});
