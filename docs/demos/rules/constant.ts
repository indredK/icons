import {  Metric } from '@ursalink-cloud/core-sdk';


// 设备类相关参数
export const Ooptions = [
    {
        value: 'monochrome',
        label: '自定义图片的通道',
    },
    {
        value: '0',
        label: '级别0',
    },
    {
        value: '1',
        label: '级别1',
    },
    {
        value: '2',
        label: '级别2',
    },
    {
        value: '3',
        label: '级别3',
    },
    {
        value: '4',
        label: '级别4',
    },
]

// 定位类相关参数
export const LtnList = [
    {
        value: 'inactive',
        label: '未激活',
    },
    {
        value: 'online',
        label: '在线',
    },
    {
        value: 'alarm',
        label: '警告',
    },
    {
        value: 'offline',
        label: '离线',
    },
]
// 特殊参数
export const Roptions = [
    {
        value: "pengsui",
        label: "喷水"
    },
    {
        value: "bupengsui",
        label: "不喷水"
    },
]



const long_url = '//at.alicdn.com/t/c/font_4110680_3iqyfkyi7ea.js'
const short_url = '//at.alicdn.com/t/c/font_4085675_e2252v56rk.js'

// url部分
export const D_oldUrl = long_url
export const C_oldUrl = long_url
export const L_oldUrl = ""
export const S_oldUrl = short_url

export enum templeName {
    device = "D",
    channel = "C",
    location = "L",
    system = "S"
}

