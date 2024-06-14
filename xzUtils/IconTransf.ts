import fs from 'fs';
import path from 'path';
import { SvgType } from './constant';
import { getString, getSvgList } from './utils';

export interface CustomIconOptions {
  scriptUrl?: string | string[];
  extraCommonProps?: { [key: string]: any };
}

/** 输入字符串，截取id=""里面的内容 */
const getId = (str: string): string => {
  const regex = /id="([^"]*)"/; // 匹配 id 属性的值
  const match = str.match(regex); // 在字符串中查找匹配项
  return match ? match[1] : ''; // 返回匹配项的第二个捕获组
};

async function createScriptUrlElements(
  currentScriptUrl: string,
  type: SvgType,
): Promise<void> {
  const stringList = await getString(currentScriptUrl);
  const svglist = getSvgList(stringList);
  console.log(
    '%c AT-[ svglist ]-26-「IconTransf」',
    'font-size:13px; background:pink; color:#bf2c9f;',
    `${new Date()},`,
    svglist.length,
  );

  // 创建文件夹以保存 SVG 文件
  const dirName = `./packages/icons-svg/svg/${type}`;

  console.log(
    '%c AT-[ res ]-36-「IconTransf」',
    'font-size:13px; background:pink; color:#bf2c9f;',
    `${new Date()},`,
    dirName,
  );
  for await (let [index, svg] of svglist.entries()) {
    const res = getId(svg) + '.svg';
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName, { recursive: true });
    }
    const filePath = path.join(dirName, res);
    fs.writeFileSync(filePath, svg);
  }
}

/** 按配置修改版本号 */
const changeNpmVersion = (obj: { [key: string]: string }): void => {
  Object.keys(obj).forEach((key) => {
    const packageJsonPath = path.resolve(
      __dirname,
      '..',
      'packages',
      key,
      'package.json',
    );
    const json = require(packageJsonPath);
    json.version = obj[key];
    if (json?.dependencies?.['@indredk/icons-svg']) {
      json.dependencies['@indredk/icons-svg'] = obj[key];
    }

    fs.writeFileSync(packageJsonPath, JSON.stringify(json, null, 2));
  });
};

/** 对阿里的url进行解析，生成对应命名的图片文件，输出到指定文件夹里 */
export default async function create(options: {
  deviceUrl: string;
  channelUrl: string;
  systemUrl: string;
  'npm-version': {
    'icons-svg': string;
    'icons-react': string;
    'icons-react-native': string;
  };
}) {
  try {
    const {
      deviceUrl,
      channelUrl,
      systemUrl,
      'npm-version': npmVersion,
    } = options;
    await createScriptUrlElements(deviceUrl, SvgType.Device);
    await createScriptUrlElements(channelUrl, SvgType.Channel);
    await createScriptUrlElements(systemUrl, SvgType.System);
    // 替换版本号
    await changeNpmVersion(npmVersion);
    console.log('已完成导入，请继续打包发布...');
  } catch (error) {
    console.log(
      '%c AT-[ error ]-75-「IconTransf」',
      'font-size:13px; background:pink; color:#bf2c9f;',
      `${new Date()},`,
      error,
    );
  }
}
