import { LtnList,  Ooptions, Roptions } from "./constant"





// 校验设备的规则
export const isDrule = (name: string | null, MODEL: string[] = []) => {
    if (MODEL.includes(name as any)) {
        return true
    }
    return false
}

// 校验通道的规则
export const isCrule = (name: string | null, MetricList: string[]) => {
    if (name) {
        return MetricList.some(i => { return name.includes(i) })
    }
    return false
}
// 判断通道图标里命名合不合格，合格为true
export const Crule = (name: string | null, MODEL: string[] = [], MetricList: string[]) => {
    if (name && isCrule(name, MetricList)) {
        const str = MetricList.find(i => { return name.includes(i) })
        const [one, two] = name.split(str!)
        if (
            (!one) ||
            (!one && Ooptions.map(i => i.value).includes(two)) ||
            (one && MODEL.includes(one as any) && !two) ||
            (one && MODEL.includes(one as any) && two && Ooptions.map(i => i.value).includes(two))
        ) {
            return true
        }
    }
    return false
}

// 校验定位的规则
export const isLrule = (name: string | null) => {
    if (name) {
        return name.includes("Ltn")
    }
    return false
}
// 判断定位图标里命名合不合格，合格为true
export const Lrule = (name: string | null, MODEL: string[] = [], MetricList: string[]) => {
    if (!!name && (isLrule(name))) {
        const [one, two] = name?.split("-Ltn-") || []
        if (LtnList.map(i => i.value).includes(two) &&
            (
                Roptions.map(i => i.value).includes(one) ||
                MODEL.includes(one as any) ||
                MetricList.includes(one as any)
            )
        ) {
            return true
        }
    }
    return false
}

// 校验系统的规则
export const isSrule = (name: string | null) => {
    if (name) {
        return name.startsWith("Sys")
    }
    return false
}
// 判断系统图标里命名合不合格，合格为true
export const Srule = (name: string | null) => {
    // "-"最多只能出现两次
    if (name && isSrule(name)) {
        return name.split("-").length <= 3
    }
    return false
}