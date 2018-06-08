import React from 'react'
import BaseObject from './BaseObject'

class DTriangle extends BaseObject {
    render () {
        const { x, y, w, h, name, listeners, data } = this.props

        return (
      <g style={{visibility: 'visible', cursor: 'move'}}>
        <path d={`M ${x} ${y} L ${x} ${y + h} L ${x + w} ${y + h * 0.5} Z`} stroke="#000000"
            fill="#ffffff" strokeMiterlimit="10" pointerEvents="all" {...listeners}/>
        <text x={x + w / 3} y={y + h / 2} textAnchor="middle" dominantBaseline="central" pointerEvents="none">{name}</text>
          <text x={x + w / 2} y={y - 10} textAnchor="middle" dominantBaseline="central" pointerEvents="none" style={this.getTextStyle()}>{data.step}</text>
      </g>
        )
    }
}

export default DTriangle
