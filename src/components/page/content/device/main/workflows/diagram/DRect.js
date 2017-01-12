import React from 'react'
import BaseObject from './BaseObject'

class DRect extends BaseObject {
  render () {
    const { x, y, w, h } = this.props

    return (
      <g transform="translate(0.5,0.5)" style={{visibility: 'visible', cursor: 'move'}}>
        <rect x={x} y={y} width={w} height={h} fill="#ffffff" stroke="#000000" pointerEvents="all" />
      </g>
    )
  }
}

export default DRect
