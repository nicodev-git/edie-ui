import { assign, findIndex, concat } from 'lodash'
import { DiagramTypes } from 'shared/Global'
import {findStepPoints, getHandlePoints} from 'shared/LineUtil'

function addLine2 (data, startObj, endObj, startPoint, endPoint, items) {
    const leftTpl = items[startObj.imgIndex]
    const rightTpl = items[endObj.imgIndex]
    const startPos = leftTpl && leftTpl.getConnectionPoint ? leftTpl.getConnectionPoint(startObj, startPoint) : {x: 0, y: 0}
    const endPos = rightTpl && rightTpl.getConnectionPoint ? rightTpl.getConnectionPoint(endObj, endPoint) : {x: 0, y: 0}

    const stepPoints = leftTpl && leftTpl.getConnectionPoint ? findStepPoints(leftTpl, startPos, startPoint, rightTpl, endPos, endPoint) : [{x: 0, y: 0}]
    const handlePoints = rightTpl && rightTpl.getConnectionPoint ? getHandlePoints(startPos, stepPoints, endPos) : [{x: 0, y: 0}]

    data.lines.push({
        id: data.lastId++,
        type: DiagramTypes.LINE,
        startObject: startObj,
        startPoint,
        endObject: endObj,
        endPoint,

        points: concat([], startPos, stepPoints, endPos),
        handlePoints
    })
}
export function drawFlows (flows, items) {
    const data = {
        objects: [],
        lines: [],
        lastId: 0,
    }

    const objMap = {}

    // let x = 0
    data.objects = flows.map((f, i) => {
        const {type} = f.uiprops

        let itemIndex = findIndex(items, {config: {type}})
        if (itemIndex < 0) itemIndex = 0

        const typeConfig = items[itemIndex] || {}
        const obj = {
            name: f.name || '[]',
            imgIndex: itemIndex,
            greyImg: parseInt(f.disabled || 0, 10) === 1,

            x: f.uiprops.x,
            y: f.uiprops.y,
            w: f.uiprops.w,
            h: f.uiprops.h,

            id: data.lastId++,
            type: DiagramTypes.OBJECT,
            config: assign({}, typeConfig.config),
            fill: f.uiprops.fill,
            data: f
        }

        objMap[f.step] = obj
        return obj
    })

    data.objects.forEach(startObj => {
        startObj.data.uiprops.lines.forEach(line => {
            const index = findIndex(data.objects, {data: {uuid: line.targetUuid}})
            if (index < 0) return
            const endObj = data.objects[index]
            addLine2(data, startObj, endObj, line.startPoint, line.endPoint, items)
        })
    })

    return data
}
