const fs = require('fs');
const path = require('path');
import { getString, getSvgList,  } from "./utils";


export interface CustomIconOptions {
  scriptUrl?: string | string[];
  extraCommonProps?: { [key: string]: any };
}


/** 输入字符串，截取id=""里面的内容 */
const getId = (str: string): string => {
  const regex = /id="([^"]*)"/; // 匹配 id 属性的值
  const match = str.match(regex); // 在字符串中查找匹配项
  return match ? match[1] : ""; // 返回匹配项的第二个捕获组
}


async function createScriptUrlElements(currentScriptUrl: string, type: string): Promise<void> {

  const stringList = await getString(currentScriptUrl)
  const svglist = getSvgList(stringList)

  // 创建文件夹以保存 SVG 文件
  const dirName = type == "sys" ?
    './packages/icons-svg/xzSvg-sys' :
    './packages/icons-svg/xzSvg';

  for (let [index, svg] of svglist.entries()) {
    const res = getId(svg) + '.svg'

    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName, { recursive: true });
    }
    const filePath = path.join(dirName, res);

    console.log('%c [ filePath ]-47', 'font-size:13px; background:pink; color:#bf2c9f;', filePath)
    console.log('%c [ dirName ]-53', 'font-size:13px; background:pink; color:#bf2c9f;', dirName)

    fs.writeFileSync(filePath, svg);
  }

  console.log(`SVG 文件已创建：${dirName}`);

}


/** 对阿里的url进行解析，生成对应命名的图片文件，输出到指定文件夹里 */
export default function create(options: any) {
  const { scriptUrl, sysUrl } = options;
  createScriptUrlElements(scriptUrl, "");
  createScriptUrlElements(sysUrl, 'sys');
}
