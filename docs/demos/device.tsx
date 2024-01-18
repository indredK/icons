import localforage from 'localforage';
import { useEffect, useState } from 'react';
import { templeName } from '../../constant';
import AllIconDemo from './AllIcons';

export default () => {
  const [data, setdata] = useState<any>([]);

  useEffect(() => {
    const init = async () => {
      const data = await localforage.getItem(
        `svgList-${templeName.device}-url`,
      );
      console.log(
        '%c [ data ]-20',
        'font-size:13px; background:pink; color:#bf2c9f;',
        data,
      );
      setdata(data);
    };
    init();
  }, []);

  return <AllIconDemo data={data} />;
};
