import React from 'react'
import {
  DropTarget
} from 'react-dnd'

import { DragTypes } from 'shared/Global'

import DRect from './diagram/DRect'
import DRoundRect from './diagram/DRoundRect'
import DEllipse from './diagram/DEllipse'
import DDiamond from './diagram/DDiamond'
import DParallel from './diagram/DParallel'
import DTriangle from './diagram/DTriangle'

function collect (connect) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

const objectComponents = [DRect, DRoundRect, DEllipse, DDiamond, DParallel, DTriangle]
const handlePoints = [
  {x: 0, y: 0, cursor: 'nw-resize'},
  {x: 0.5, y: 0, cursor: 'n-resize'},
  {x: 1, y: 0, cursor: 'ne-resize'},
  {x: 0, y: 0.5, cursor: 'w-resize'},
  {x: 1, y: 0.5, cursor: 'e-resize'},
  {x: 0, y: 1, cursor: 'sw-resize'},
  {x: 0.5, y: 1, cursor: 's-resize'},
  {x: 1, y: 1, cursor: 'se-resize'}
]

const canvasTarget = {
  canDrop () {
    return true
  },

  drop (props, monitor, component) {
    props.onDrop(monitor.getItem(), monitor.getClientOffset(), component)
  }
}

class DiagramPanel extends React.Component {

  onClickObject (obj) {
    this.props.selectDiagramObject(obj)
  }

  renderObject (obj) {
    const ItemObject = objectComponents[obj.imgIndex] || DRect
    const listeners = {
      onClick: this.onClickObject.bind(this, obj)
    }

    return (
      <ItemObject key={obj.id} {...obj} listeners={listeners}/>
    )
  }

  renderObjects () {
    const { objects } = this.props

    return objects.map(obj => this.renderObject(obj))
  }

  renderSelection (obj) {
    const { x, y, w, h } = obj

    return (
      <g key={`sel-${obj.id}`}>
        <g style={{cursor: 'move'}}>
          <rect x={x} y={y} width={w} height={h} fill="none" stroke="#00a8ff" strokeDasharray="3 3" pointerEvents="none"/>
        </g>
        {
          handlePoints.map((p, index) =>
            <g key={index} style={{cursor: p.cursor}}>
              <image x={x + w * p.x - 8.5} y={y + h * p.y - 8.5} width="17" height="17" xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="/images/handle.png" preserveAspectRatio="none"/>
            </g>
          )
        }
      </g>
    )
  }

  renderSelected () {
    const { selected } = this.props
    return selected.map(obj => this.renderSelection(obj))
  }

  render () {
    const { connectDropTarget, backImg } = this.props

    const style = {
      backgroundImage: `url(data:image/svg+xml;base64,${backImg})`,
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgb(255, 255, 255)'
    }
    return connectDropTarget(
      <div className="draw-panel">
        <svg style={style}>
          {this.renderObjects()}
          {this.renderSelected()}
        </svg>

      </div>
    )
  }
}
export default DropTarget(DragTypes.WORKFLOW, canvasTarget, collect)(DiagramPanel)
