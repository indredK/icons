/** 图标按业务分类 */
export enum BusinessType {
  /** 设备自身图标，每个设备唯一 */
  Device = 'Device',
  /** 设备在地图的图标，在线告警离线未激活 */
  MapDevice = 'MapDevice',
  /** 一般的通道图标，每个通道唯一的那种 */
  Channel = 'Channel',
  /** 通道在仪表盘的图标，包括多种告警和其他状态 */
  DashboardChannel = 'DashboardChannel',
  /** 通道在仪表盘的自定义图片的图标 */
  DashboardChannelCustom = 'DashboardChannelCustom',
  /** 系统图标 */
  System = 'System',
}

// 设备型号

// 广义上的通道名称，每个通道唯一

// 状态，设备状态：在线离线未激活报警（网关无报警）
// 通道状态，触发，未触发，下发状态未同步，下发失败，下发超时，
// 通道值：枚举（什么等级，风扇是什么，执行事件是什么），数值（剩余量），

// 规则：没有完全匹配上，就直接给出一个默认图片
