import * as React from 'react';
import * as AntdIcons from '../../packages/icons-react/src/icons';

const LoadModules = () => {
  React.useEffect(() => {
    console.log(AntdIcons);
  }, []);

  return null;
}

export default LoadModules;
