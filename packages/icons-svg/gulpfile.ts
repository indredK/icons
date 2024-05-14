import { readFileSync } from 'fs';
import { parallel, series } from 'gulp';
import { resolve } from 'path';
import { SvgType } from '../../xzUtils/constant';
import {
  adjustViewBox,
  assignAttrsAtTag,
  setDefaultColorAtPathTag
} from './plugins/svg2Definition/transforms';
import { remainFillConfig } from './plugins/svgo/presets';
import {
  clean,
  copy,
  generateEntry,
  generateIcons,
  generateInline
} from './tasks/creators';
import { ExtractRegExp } from './tasks/creators/generateInline';
import { IconDefinition } from './templates/types';
import { getIdentifierXzSvg, getIdentifierXzSvgSys } from './utils';
const iconTemplate = readFileSync(
  resolve(__dirname, './templates/icon.ts.ejs'),
  'utf8'
);

/** xz图标的实现 */
const xzGenerate = [
  generateIcons({
    theme: SvgType.Device,
    from: [`svg/${SvgType.Device}/*.svg`],
    toDir: 'src/asn',
    svgoConfig: remainFillConfig,
    extraNodeTransformFactories: [
      assignAttrsAtTag('svg', { focusable: 'false' }),
      adjustViewBox,
      setDefaultColorAtPathTag('#333')
    ],
    stringify: JSON.stringify,
    template: iconTemplate,
    mapToInterpolate: ({ name, content }) => ({
      identifier: getIdentifierXzSvg({ name, themeSuffix: SvgType.Device }),
      content
    }),
    filename: ({ name }) =>
      getIdentifierXzSvgSys({ name, themeSuffix: SvgType.Device })
  }),

  generateIcons({
    theme: SvgType.Channel,
    from: [`svg/${SvgType.Channel}/*.svg`],
    toDir: 'src/asn',
    svgoConfig: remainFillConfig,
    extraNodeTransformFactories: [
      assignAttrsAtTag('svg', { focusable: 'false' }),
      adjustViewBox,
      setDefaultColorAtPathTag('#333')
    ],
    stringify: JSON.stringify,
    template: iconTemplate,
    mapToInterpolate: ({ name, content }) => ({
      identifier: getIdentifierXzSvgSys({ name, themeSuffix: SvgType.Channel }),
      content
    }),
    filename: ({ name }) =>
      getIdentifierXzSvgSys({ name, themeSuffix: SvgType.Channel })
  }),
  generateIcons({
    theme: SvgType.System,
    from: [`svg/${SvgType.System}/*.svg`],
    toDir: 'src/asn',
    svgoConfig: remainFillConfig,
    extraNodeTransformFactories: [
      assignAttrsAtTag('svg', { focusable: 'false' }),
      adjustViewBox,
      setDefaultColorAtPathTag('#333')
    ],
    stringify: JSON.stringify,
    template: iconTemplate,
    mapToInterpolate: ({ name, content }) => ({
      identifier: getIdentifierXzSvgSys({ name, themeSuffix: SvgType.System }),
      content
    }),
    filename: ({ name }) =>
      getIdentifierXzSvgSys({ name, themeSuffix: SvgType.System })
  })
];

export default series(
  // 1. clean
  clean(['src', 'inline-svg', 'inline-namespaced-svg', 'es', 'lib']),

  parallel(
    // 2.1 copy helpers.ts, types.ts
    copy({
      from: ['templates/*.ts'],
      toDir: 'src'
    }),
    // ...antdGenerate,
    ...xzGenerate
  ),
  parallel(
    // 3.1 generate entry file: src/index.ts
    generateEntry({
      entryName: 'index.ts',
      from: ['src/asn/*.ts'],
      toDir: 'src',
      banner: '// This index.ts file is generated automatically.\n',
      template: `export { default as <%= identifier %> } from '<%= path %>';`,
      mapToInterpolate: ({ name: identifier }) => ({
        identifier,
        path: `./asn/${identifier}`
      })
    }),

    // 3.2 generate inline SVG files
    generateInline({
      from: ['src/asn/*.ts'],
      toDir: ({ _meta }) => `inline-svg/${_meta && _meta.theme}`,
      getIconDefinitionFromSource: (content: string): IconDefinition => {
        const extract = ExtractRegExp.exec(content);
        if (extract === null || !extract[1]) {
          throw new Error('Failed to parse raw icon definition: ' + content);
        }
        return new Function(`return ${extract[1]}`)() as IconDefinition;
      }
    }),
    // 3.3 generate inline SVG files with namespace
    generateInline({
      from: ['src/asn/*.ts'],
      toDir: ({ _meta }) => `inline-namespaced-svg/${_meta && _meta.theme}`,
      getIconDefinitionFromSource: (content: string): IconDefinition => {
        const extract = ExtractRegExp.exec(content);
        if (extract === null || !extract[1]) {
          throw new Error('Failed to parse raw icon definition: ' + content);
        }
        return new Function(`return ${extract[1]}`)() as IconDefinition;
      },
      renderOptions: {
        extraSVGAttrs: { xmlns: 'http://www.w3.org/2000/svg' }
      }
    })
  )
);
