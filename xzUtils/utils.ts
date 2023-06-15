

const http = require('http');

/** web端的获取方法 */
export const getString_web = async (param: string): Promise<string> => {
  let url = new URL(param.includes("http") ? param : `https:${param}`);

  const response = await fetch(url.href);
  if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.text();
}

/** 通过阿里的url，获取所有svg字符串 */
export const getString = async (param: string): Promise<string> => {
  let url = new URL(param.includes("http") ? param : `https:${param}`)
  // 根据实际情况替换主机名和路径
  const options = {
    hostname: url.host,
    path: url.pathname,
    method: 'GET'
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res: any) => {
      let data = '';

      res.on('data', (chunk: any) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(`Request failed with status code ${res.statusCode}`);
        }
      });
    });

    req.on('error', (error: any) => {
      reject(`Error: ${error.message}`);
    });

    req.end();
  });


}

/** 通过有svg的字符串，获取里面所有svg图片，存在数组里返回 */
export const getSvgList = (stringList: string): string[] => {

  const pattern = /(<symbol[^>]*>.*?<\/symbol>)/gs;
  let svglist: string[] = [];

  let match;
  // 如果使用两行repleace有问题
  while ((match = pattern.exec(stringList)) !== null) {
    svglist.push(match[1].replace('<symbol', `<?xml version="1.0" standalone="no"?><svg xmlns="http://www.w3.org/2000/svg" class="icon" `).replace('</symbol>', `</svg>`));
  }

  return svglist
}

// export enum IconType {
//   Device = 'dve',
//   Channel = 'chn',
//   System = 'sys',
//   Other = 'other'
// }


// let obj: { [key in IconType]: any } = {
//   'dve': (nameList: string[]) => { return nameList.slice(1).join('-') + '.svg' },
//   'chn': (nameList: string[]) => { return nameList.slice(1).join('-') + '.svg' },
//   'sys': (nameList: string[]) => { return nameList.slice(1).join('-') + '.svg' },
//   'other': (nameList: string[]) => { return nameList.slice(1).join('-') + '.svg' },
// }

// export const typeToDo: { [key in 'dve' | 'chn' | 'sys' | 'other']: any } = {
/** 输入svg的唯一名称，返回需要归属的文件夹名和文件名数组 */
// export const getFileName = (list: string[], index: number) => {

//   const [xz, type, name, other] = list
//   if (Object.values(IconType).includes(type as IconType)) {
//     return [type, obj[type](list)]
//   } else {
//     return ['other', 'other-' + list.slice(1).join('-') + '.svg']
//   }
// }