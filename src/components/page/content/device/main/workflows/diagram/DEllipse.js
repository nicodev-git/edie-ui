import React from 'react'
import BaseObject from './BaseObject'

class DEllipse extends BaseObject {
  render () {
    const { x, y, w, h } = this.props

    return (
      <g style={{visibility: 'visible', cursor: 'move'}}>
        <ellipse cx={x + w / 2} cy={y + h / 2} rx={w / 2} ry={h / 2} fill="#ffffff" stroke="#000000" pointerEvents="all"/>
      </g>
    )
  }
}

export default DEllipse
