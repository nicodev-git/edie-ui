import React from 'react'
import BaseObject from './BaseObject'

class DText extends BaseObject {
    render () {
        const { x, y, w, h, name, listeners } = this.props

        return (
      <g style={{visibility: 'visible', cursor: 'move'}}>
        <text x={x + w / 2} y={y + h / 2} textAnchor="middle" dominantBaseline="central" pointerEvents="all" style={this.getTextStyle()} {...listeners}>{name}</text>
      </g>
        )
    }
}

export default DText
