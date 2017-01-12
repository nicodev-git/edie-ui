import React from 'react'
import BaseObject from './BaseObject'

class DTriangle extends BaseObject {
  render () {
    const { x, y, w, h, listeners } = this.props

    return (
      <g style={{visibility: 'visible', cursor: 'move'}}>
        <path d={`M ${x} ${y} L ${x} ${y + h} L ${x + w} ${y + h * 0.5} Z`} stroke="#000000"
          fill="#ffffff" strokeMiterlimit="10" pointerEvents="all" {...listeners}/>
      </g>
    )
  }
}

export default DTriangle
