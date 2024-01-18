export enum SvgType {
  /** 设备类文件夹 */
  Device = 'Device',
  /** 通道类文件夹 */
  Channel = 'Channel',
  /** 系统类文件夹 */
  System = 'System'
}

export interface AbstractNode {
  tag: string;
  attrs: {
    [key: string]: string;
  };
  children?: AbstractNode[];
}

export interface IconDefinition {
  name: string; // kebab-case-style
  theme: ThemeType;
  icon:
    | ((primaryColor: string, secondaryColor: string) => AbstractNode)
    | AbstractNode;
}

export type ThemeType = keyof typeof SvgType;
export type ThemeTypeUpperCase = keyof typeof SvgType;
