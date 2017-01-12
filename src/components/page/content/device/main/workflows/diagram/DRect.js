import React from 'react'
import BaseObject from './BaseObject'

class DRect extends BaseObject {
  render () {
    const { x, y, w, h, listeners } = this.props

    return (
      <g style={{visibility: 'visible', cursor: 'move'}}>
        <rect x={x} y={y} width={w} height={h} fill="#ffffff" stroke="#000000" pointerEvents="all" {...listeners}/>
      </g>
    )
  }
}

export default DRect
