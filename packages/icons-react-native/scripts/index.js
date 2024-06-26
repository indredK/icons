const path = require('path');
const fs = require('fs-extra');
const prettier = require('prettier');
const WebpackIconfontPluginNodejs = require('webpack-iconfont-plugin-nodejs');

const fonts = ['Device', 'Channel', 'System'];

const upperName = (name) => name.charAt(0).toUpperCase() + name.slice(1);

fs.ensureDirSync('fonts');
fs.ensureDirSync('iconfont');

fonts.forEach((name) => {
  const fontName = `ant${name}`;
  const uppercaseName = upperName(name);

  const svgFolder = path.resolve(
    process.cwd(),
    '../icons-svg/svg/',
    // compatible old one
    name,
  );
  const dist = `iconfont/${name}`;

  var options = {
    fontName,
    svgs: path.join(svgFolder, '*.svg'),
    fontsOutput: path.join(dist, ''),
    cssOutput: path.join(dist, 'font.css'),
    htmlOutput: path.join(dist, '_font-preview.html'),
    jsOutput: path.join(dist, 'fonts.json'),
  };
  new WebpackIconfontPluginNodejs(options).build(() => {
    const json = require(path.join('../', options.jsOutput));
    fs.copyFileSync(
      path.join(dist, `${fontName}.ttf`),
      `fonts/${fontName}.ttf`,
    );
    const content = `
// Note: this file was generated by 'npm run generate' do not modify it manually
// tslint:disable
import * as React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
export const ${name}GlyphMap = ${JSON.stringify(json, null, 2)};

export type ${uppercaseName}GlyphMapType = keyof typeof ${name}GlyphMap;

export interface Icon${uppercaseName}Props extends TextProps {
	name: ${uppercaseName}GlyphMapType;
	size?: number;
	color?: string
}

export default class Icon${uppercaseName} extends React.PureComponent<Icon${uppercaseName}Props> {
  render() {
    const {
      name,
      style,
      children,
      size = 14,
      color = "black",
      ...props
    } = this.props;
    const styleOverrides: TextStyle = {
      fontFamily: "ant${name}",
      fontWeight: "normal",
      fontStyle: "normal",
      fontSize: size,
      color
    };
    let glyph = name ? ${name}GlyphMap[name] || "?" : "";
    if (typeof glyph === "number") {
      glyph = String.fromCharCode(glyph);
    }
    return (
      <Text {...props} style={[styleOverrides, style]}>
        {glyph}
        {children}
      </Text>
    );
  }
}

		`;

    fs.writeFileSync(
      `src/${name}.tsx`,
      prettier.format(content, { parser: 'typescript' }),
    );
  });
});

// index.tsx
const contents = fonts.map((font) => {
  return [
    `export { default as Icon${upperName(font)} } from './${font}';\n`,
    `export type { Icon${upperName(font)}Props, ${upperName(
      font,
    )}GlyphMapType } from './${font}';\n`,
  ].join('');
});

fs.writeFileSync('src/index.tsx', contents.join(''));
