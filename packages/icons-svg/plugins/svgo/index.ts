import SVGO from 'svgo';
import { createTrasformStreamAsync } from '../creator';

export const svgo = (options: SVGO.Options, optimizePath?: boolean) => {
  const optimizer = new SVGO(options);
  return createTrasformStreamAsync(async (before) => {
    // 指定为false的时候
    if (optimizePath === false) {
      return before;
    } else {
      const { data } = await optimizer.optimize(before);
      return data;
    }
  });
};
