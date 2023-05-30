---
nav: 
  title: 介绍
  order: -1
group:
  title: 介绍
  order: -1
---


# 什么是 xz-icons

星纵平台需要一套完整可靠的图标解决方案，对开源的antd的icons进行二次开发，按antd的设计思想，将svg原图片先进行语义化，满足各种框架的基本适配，然后再对react框架进行适配封装，达到所有图标的可组合，和按需导入。

## icons-svg

`@ant-design/icons-svg` 是 Ant Design 官方所推出的语义化矢量图形库。该库提供了描述图标的抽象节点（Abstract Node, ASN）来满足各种框架的基本适配。
参考`@ant-design/icons-svg`的设计思想，将https://www.iconfont.cn/ 导入的图标库转换为语义化的ASN节点，并在代码中使用ASN节点替换，最后导出。

- 🚀 **更小的体积**：比直接使用  <a href="https://ant.design/components/icon-cn#%E8%87%AA%E5%AE%9A%E4%B9%89-font-%E5%9B%BE%E6%A0%87" target="_blank" rel="noreferrer">官方推荐的自定义导入方式</a> ，以依赖库的方式能够实现按需导入，体积更小。

- 🔍 **更好的兼容体验**：每次更新图标只需要在源码中更新svg并编译发布，即可在各个平台使用

- 🎨 **强制命名**： 约定好命名方式，保证后续兼容的规范化


## icons-react

类似`@antd-icons`的使用体验
