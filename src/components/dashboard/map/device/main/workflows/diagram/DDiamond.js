import React from 'react'
import BaseObject from './BaseObject'

class DDiamond extends BaseObject {
    render () {
        const { x, y, w, h, name, fill, listeners, data } = this.props

        return (
          <g style={{visibility: 'visible', cursor: 'move'}}>
            <path
                d={`M ${x + w / 2} ${y} L ${x} ${y + h / 2} L ${x + w / 2} ${y + h} L ${x + w} ${y + h / 2} Z`}
                stroke="#000000" strokeWidth="2"
                fill={fill || 'transparent'} strokeMiterlimit="10" pointerEvents="all" {...listeners}/>
            <text x={x + w / 2} y={y + h / 2} textAnchor="middle" dominantBaseline="central" pointerEvents="none" style={this.getTextStyle()}>{name}</text>
            <text x={x + w / 2} y={y - 10} textAnchor="middle" dominantBaseline="central" pointerEvents="none" style={this.getTextStyle()}>{data.step}</text>
          </g>
        )
    }
}

export default DDiamond
