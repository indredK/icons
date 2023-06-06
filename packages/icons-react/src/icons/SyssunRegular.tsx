// GENERATE BY ./scripts/generate.ts
// DON NOT EDIT IT MANUALLY

import * as React from 'react'
import SyssunRegularSvg from '../../../icons-svg/lib/asn/SyssunRegular';
import AntdIcon, { AntdIconProps } from '../components/AntdIcon';

const SyssunRegular = (
  props: AntdIconProps,
  ref: React.MutableRefObject<HTMLSpanElement>,
) => <AntdIcon {...props} ref={ref} icon={SyssunRegularSvg} />;

if (process.env.NODE_ENV !== 'production') {
  SyssunRegular.displayName = 'SyssunRegular';
}
export default React.forwardRef<HTMLSpanElement, AntdIconProps>(SyssunRegular);