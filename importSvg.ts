import Util from './xzUtils/IconTransf'

Util({
  // 阿里icon地址，在 iconfont
  scriptUrl: '//at.alicdn.com/t/c/font_4085675_e2252v56rk.js',
  // 阿里的iconfont，只用来存放系统图标
  sysUrl: '//at.alicdn.com/t/c/font_4099951_3u4zqnqqcbr.js',
  // 每次更新以后记得把它的版本版本号更新，三个都要更新，否则会导致CI发布失败
  "npm-version": {
    // 对应packages里面的文件夹名字
    "icons-svg": "1.0.1",
    "icons-react": "1.0.1",
    "icons-react-native": "1.0.1",
  }
});