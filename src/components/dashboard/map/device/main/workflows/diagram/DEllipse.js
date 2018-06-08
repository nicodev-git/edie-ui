import React from 'react'
import BaseObject from './BaseObject'

class DEllipse extends BaseObject {
    render () {
        const { x, y, w, h, name, listeners, data } = this.props

        return (
      <g style={{visibility: 'visible', cursor: 'move'}}>
        <ellipse cx={x + w / 2} cy={y + h / 2} rx={w / 2} ry={h / 2} fill="#ffffff" stroke="#000000" pointerEvents="all" {...listeners}/>
        <text x={x + w / 2} y={y + h / 2} textAnchor="middle" dominantBaseline="central" pointerEvents="none" style={this.getTextStyle()}>{name}</text>
        <text x={x + w / 2} y={y - 10} textAnchor="middle" dominantBaseline="central" pointerEvents="none" style={this.getTextStyle()}>{data.step}</text>
      </g>
        )
    }
}

export default DEllipse
