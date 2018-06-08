import React from 'react'
import {assign} from 'lodash'

import BaseObject from './BaseObject'

const titleStyle = {
    textDecoration: 'underline'
}
class DRect extends BaseObject {
    getTitleStyle () {
        return assign({}, super.getTextStyle(), titleStyle)
    }
    render () {
        const {x, y, w, h, name, bodyText, fill, listeners, data } = this.props

        return (
            <g style={{visibility: 'visible', cursor: 'move'}}>
                <rect
                    x={x} y={y} width={w} height={h} rx="12" ry="12" fill={fill || 'transparent'} stroke="#000000" strokeWidth="2"
                    pointerEvents="all" {...listeners}/>
                <text
                    x={x + w / 2} y={y + 12} textAnchor="middle" dominantBaseline="central" pointerEvents="none"
                    style={this.getTitleStyle()}>{name}</text>
                <line x1={x + 1} y1={y + 24} x2={x + w - 1} y2={y + 24} strokeWidth="1" stroke="#D0CCC0" />

                <text
                    x={x + w / 2} y={y + h / 2 + 10} textAnchor="middle" dominantBaseline="central" pointerEvents="none"
                    style={this.getTextStyle()}>
                    {bodyText || 'Data'}
                </text>
                <text x={x + w / 2} y={y - 10} textAnchor="middle" dominantBaseline="central" pointerEvents="none" style={this.getTextStyle()}>{data.step}</text>
            </g>
        )
    }
}

export default DRect
