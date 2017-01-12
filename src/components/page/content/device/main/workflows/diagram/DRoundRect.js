import React from 'react'
import BaseObject from './BaseObject'

class DRoundRect extends React.Component {
  render() {
    const { x, y, w, h } = this.props

    return (
      <g style={{visibility: 'visible', cursor: 'move'}}>
        <rect x={x} y={y} rx={6} ry={6} width={w} height={h} fill="#ffffff" stroke="#000000" pointerEvents="all" />
      </g>
    )
  }
}

export default DRoundRect