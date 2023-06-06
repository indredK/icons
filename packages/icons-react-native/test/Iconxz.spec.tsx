import * as React from 'react';
import * as renderer from 'react-test-renderer';

import IconXz, { xzGlyphMap, IconXzProps } from '../src/xz';

function mount(props: IconXzProps) {
  const component = renderer.create(<IconXz {...props} />);
  return component.toJSON();
}

describe('IconFill', () => {
  it('should create fillGlyphMap', () => {
    expect(xzGlyphMap).toMatchSnapshot();
  });

  // it('should create Icon element.', () => {
  //   const icon = mount({ name: 'account-book' });
  //   expect((icon as any).children![0]).toBe(
  //     String.fromCharCode(xzGlyphMap['account-book'])
  //   );
  //   expect(icon).toMatchSnapshot();
  // });
  // it('props exists', () => {
  //   const icon = mount({ name: 'alipay-circle', size: 24, color: 'black' });
  //   expect(icon).toMatchSnapshot();
  // });
});
