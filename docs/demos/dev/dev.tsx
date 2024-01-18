import AllIconDemo from './_showIcons';

import camelCase from 'lodash.camelcase';
import upperFirst from 'lodash.upperfirst';
import * as AntdIcons from '../../../packages/icons-react';

const allIcons: {
  [key: string]: any;
} = AntdIcons;

// eslint-disable-next-line react/display-name
export default () => {
  const one = 'EM300-SLD-N00CN';
  const one1 = 'ltn';
  const one2 = 'online';

  const name =
    //  (one?.replace(/[-_]/g, "") || "") +
    upperFirst(camelCase(one)) +
    upperFirst(camelCase(one1)) +
    upperFirst(camelCase(one2));

  const Component = allIcons[name];

  console.log(
    '%c [ AntdIcons ]-15',
    'font-size:13px; background:pink; color:#bf2c9f;',
    AntdIcons,
  );
  console.log(
    '%c [ AntdIcons ]-15',
    'font-size:13px; background:pink; color:#bf2c9f;',
    name,
  );

  return (
    <div>
      <Component style={{ fontSize: 60 }} />
      已经实现按名字提取svg返回 在这里要实现命名工具里面说明的代码用法
      <AllIconDemo type={'all'} />
    </div>
  );
};
