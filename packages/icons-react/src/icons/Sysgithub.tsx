// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

import * as React from 'react'
import SysgithubSvg from '../../../icons-svg/lib/asn/Sysgithub';
import AntdIcon, { AntdIconProps } from '../components/AntdIcon';

const Sysgithub = (
  props: AntdIconProps,
  ref: React.MutableRefObject<HTMLSpanElement>,
) => <AntdIcon {...props} ref={ref} icon={SysgithubSvg} />;

if (process.env.NODE_ENV !== 'production') {
  Sysgithub.displayName = 'Sysgithub';
}
export default React.forwardRef<HTMLSpanElement, AntdIconProps>(Sysgithub);