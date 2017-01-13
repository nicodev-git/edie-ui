import React from 'react'
import {
  DropTarget
} from 'react-dnd'

import { DragTypes } from 'shared/Global'
import DRect from './diagram/DRect'
import { workflowItems, handlePoints } from './DiagramItems'

function collect (connect) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

const canvasTarget = {
  canDrop () {
    return true
  },

  drop (props, monitor, component) {
    props.onDrop(monitor.getItem(), monitor.getClientOffset(), component)
  }
}

class DiagramPanel extends React.Component {

  onClickObject (obj, e) {
    this.props.selectDiagramObject(obj)
  }

  onMouseOverObject (obj) {
    this.props.setHoverDiagramObject(obj)
  }

  onMouseOutObject (obj) {
    this.props.clearHoverDiagramObject(obj)
  }

  // ///////////////////////////////////////////////////

  onMouseOverHoverPoint (object, point) {
    this.props.setHoverPoint(point)
  }

  // ///////////////////////////////////////////////////

  onMouseDownPanel (e) {
    for (const className of e.target.classList) if (className === 'object') return
    this.props.selectDiagramObject(null)
  }

  onMouseMovePanel (e) {
    if (e.buttons === 1) {
      console.log('drag')
    }
  }

  // ///////////////////////////////////////////////////

  renderObject (obj) {
    const ItemObject = workflowItems[obj.imgIndex].component || DRect
    const listeners = {
      className: 'object',
      onMouseDown: this.onClickObject.bind(this, obj),
      onMouseOver: this.onMouseOverObject.bind(this, obj)
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

  renderHovered () {
    const { hovered, selected, hoverPoint } = this.props
    if (!hovered) return null
    if (selected && selected.filter(s => s.id === hovered.id).length > 0) return null

    const item = workflowItems[hovered.imgIndex]

    let points = []
    let hoverPointComp
    for (let i = 0; i < item.connectionPoints; i++) {
      const xy = item.getConnectionPoint(hovered, i)
      points.push(
        <g key={i}>
          <image x={xy.x - 2.5} y={xy.y - 2.5}
            width="5" height="5" href="/images/point.gif" preserveAspectRatio="none"
            pointerEvents="all"
            onMouseOver={this.onMouseOverHoverPoint.bind(this, hovered, i)}/>
        </g>
      )

      if (i === hoverPoint) {
        hoverPointComp = (
          <g>
            <ellipse cx={xy.x} cy={xy.y} rx="10" ry="10" fillOpacity="0.3" fill="#00ff00" stroke="#00ff00" strokeOpacity="0.3" pointerEvents="none"/>
          </g>
        )
      }
    }
    return (
      <g pointerEvents="all"
        onMouseOut={this.onMouseOutObject.bind(this, hovered)}>
        {points}
        {hoverPointComp}
      </g>
    )
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
      <div className="draw-panel" onMouseDown={this.onMouseDownPanel.bind(this)} onMouseMove={this.onMouseMovePanel.bind(this)}>
        <svg style={style}>
          {this.renderObjects()}
          {this.renderSelected()}
          {this.renderHovered()}
        </svg>

      </div>
    )
  }
}
export default DropTarget(DragTypes.WORKFLOW, canvasTarget, collect)(DiagramPanel)
