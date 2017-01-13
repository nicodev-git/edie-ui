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

  onSvgRef (el) {
    this.svgEl = el
  }

  // //////////////////////////////////////////////////

  onMouseDownObject (obj) {
    this.props.selectDiagramObject(obj)
  }

  onMouseOverObject (obj) {
    this.props.setHoverDiagramObject(obj)
  }

  onMouseOutObject (obj) {
    this.props.clearHoverDiagramObject(obj)
  }

  // ///////////////////////////////////////////////////

  onMouseDownLineHandle (point, pos, object) {
    console.log(`onMouseDownLineHandle ${point}`)
    this.props.setDiagramLineDrawing(true)
    this.props.setDiagramLineStartPoint(pos, object, point)
    this.props.setDiagramLineEndPoint(pos)
  }

  onMouseOverHoverPoint (object, point) {
    this.props.setHoverPoint(point)
  }

  // ///////////////////////////////////////////////////

  onMouseDownHandlePoint (point, e) {
    this.props.setDiagramResizingPoint(point)
  }

  // ///////////////////////////////////////////////////

  convertEventPosition (e) {
    const rt = this.svgEl.getClientRects()[0]
    return {
      x: e.clientX - rt.left,
      y: e.clientY - rt.top
    }
  }

  onDragObjectStart (e) {
    this.props.setDiagramDragging(true)
  }

  onDraggingObject (e) {
  }

  onDragObjectEnd (e) {
    const { mouseDownPos, cursorPos } = this.props

    this.props.moveDiagramSelectedObjects({
      x: cursorPos.x - mouseDownPos.x,
      y: cursorPos.y - mouseDownPos.y
    })
  }

  // ///////////////////////////////////////////////////

  onResizeObjectStart (e) {
    this.props.setDiagramResizing(true)
  }

  onResizeObject (offset) {
    this.props.resizeDiagramSelectedObjects(offset)
  }

  onResizeObjectEnd (e) {

  }

  // ///////////////////////////////////////////////////

  onLineDrawStart (e) {
    console.log('onLineDrawStart')
    this.props.setDiagramLineDraw(true)
  }

  onLineDraw (pos) {
    this.props.setDiagramLineEndPoint(pos)
  }

  onLineDrawEnd (e) {
    const { hovered, hoverPoint, lineStartObject, lineStartObjectPoint, lastId } = this.props
    if (!hovered || hoverPoint < 0) return
    this.props.addDiagramLine({
      id: lastId + 1,
      startObject: lineStartObject,
      startPoint: lineStartObjectPoint,
      endObject: hovered,
      endPoint: hoverPoint
    })
  }

  // ///////////////////////////////////////////////////
  onMouseDownPanel (e) {
    let objectType = ''

    for (const className of e.target.classList) {
      if (className === 'object') objectType = 'object'
      else if (className === 'resize-handle') objectType = 'resize-handle'
      else if (className === 'line-handle') objectType = 'line-handle'
    }

    console.log(`onMouseDownPanel ${objectType}`)
    this.props.setDiagramMouseDown(true, this.convertEventPosition(e), objectType)
    if (objectType) return

    this.props.selectDiagramObject(null)
  }

  onMouseMovePanel (e) {
    const { isMouseDown, selected, isDragging, isResizing, isLineDrawing, mouseDownObject, cursorPos } = this.props

    // Object dragging
    if (e.buttons === 1 && isMouseDown) {
      const pos = this.convertEventPosition(e)
      const offset = {
        x: pos.x - cursorPos.x,
        y: pos.y - cursorPos.y
      }

      this.props.setDiagramCursorPos(pos)

      if (selected.length) {
        if (mouseDownObject === 'object') {
          if (!isDragging) this.onDragObjectStart(e)
          this.onDraggingObject(e)
        } else if (mouseDownObject === 'resize-handle') {
          if (!isResizing) this.onResizeObjectStart(e)
          this.onResizeObject(offset)
        }
      } else if (isLineDrawing) {
        if (mouseDownObject === 'line-handle') {
          this.onLineDraw(cursorPos)
        }
      }
    } else {
      if (isDragging || isResizing) this.props.setDiagramMouseDown(false)
    }
  }

  onMouseUpPanel (e) {
    const { isDragging, isResizing, isLineDrawing } = this.props
    if (isDragging) {
      this.onDragObjectEnd(e)
    }
    if (isResizing) {
      this.onResizeObjectEnd(e)
    }
    if (isLineDrawing) {
      this.onLineDrawEnd(e)
    }
    this.props.setDiagramMouseDown(false)
  }

  // ///////////////////////////////////////////////////

  renderObject (obj) {
    const ItemObject = workflowItems[obj.imgIndex].component || DRect
    const listeners = {
      className: 'object',
      onMouseDown: this.onMouseDownObject.bind(this, obj),
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

  renderLine (line) {
    const startItem = workflowItems[line.startObject.imgIndex]
    const startPos = startItem.getConnectionPoint(line.startObject, line.startPoint)
    const endItem = workflowItems[line.endObject.imgIndex]
    const endPos = endItem.getConnectionPoint(line.endObject, line.endPoint)

    return (
      <path key={`line-${line.id}`} d={`M ${startPos.x} ${startPos.y} L ${endPos.x} ${endPos.y} Z`} stroke="#000000"
        fill="#ffffff" strokeMiterlimit="10"/>
    )
  }

  renderLines () {
    const { lines } = this.props

    return lines.map(line => this.renderLine(line))
  }

  renderDrawingLines () {
    const { isLineDrawing, lineStart, lineEnd } = this.props
    if (!isLineDrawing) return null

    return (
      <path d={`M ${lineStart.x} ${lineStart.y} L ${lineEnd.x} ${lineEnd.y} Z`} stroke="#000000"
        fill="#ffffff" strokeMiterlimit="10"/>
    )
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
              <image x={x + w * p.x - 8.5} y={y + h * p.y - 8.5}
                className="resize-handle"
                onMouseDown={this.onMouseDownHandlePoint.bind(this, index)}
                width="17"
                height="17"
                href="/images/handle.png"
                preserveAspectRatio="none"/>
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
    const { hovered, selected, hoverPoint, isDragging } = this.props
    if (!hovered || isDragging) return null
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
            className="line-handle"
            pointerEvents="all"
            onMouseDown={this.onMouseDownLineHandle.bind(this, i, xy, hovered)}
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

    const {x, y, w, h} = hovered

    return (
      <g pointerEvents="all"
        onMouseOut={this.onMouseOutObject.bind(this, hovered)}>
        <g style={{cursor: 'move'}}>
          <rect x={x - 10} y={y - 10} width={w + 20} height={h + 20} fill="none" stroke="transparent" className="object"
            onMouseDown={this.onMouseDownObject.bind(this, hovered)}/>
          {hoverPointComp}
        </g>
        <g>
          {points}
        </g>
      </g>
    )
  }

  renderDragging () {
    const { isDragging, mouseDownPos, cursorPos, selected } = this.props
    if (!isDragging) return null

    const offsetX = cursorPos.x - mouseDownPos.x
    const offsetY = cursorPos.y - mouseDownPos.y

    return selected.map(obj =>
      <g key={`dragging-${obj.id}`} style={{cursor: 'move'}}>
        <rect x={obj.x + offsetX} y={obj.y + offsetY} width={obj.w} height={obj.h} fill="none" stroke="#000000" strokeDasharray="3 3" pointerEvents="none"/>
      </g>
    )
  }

  renderDraggingHint () {
    const { isDragging, mouseDownPos, cursorPos, selected } = this.props
    if (!isDragging) return null

    const {w, h} = selected[0]
    const x = parseInt(selected[0].x + cursorPos.x - mouseDownPos.x)
    const y = parseInt(selected[0].y + cursorPos.y - mouseDownPos.y)

    const text = `${x}, ${y}`
    return (
      <div className="geHint" style={{left: `${x + w / 2 - 6.1 * text.length / 2 - 16}px`, top: `${y + h + 16}px`}}>{text}</div>
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
      <div className="draw-panel flex-1"
        onMouseDown={this.onMouseDownPanel.bind(this)}
        onMouseMove={this.onMouseMovePanel.bind(this)}
        onMouseUp={this.onMouseUpPanel.bind(this)}>
        <svg style={style} ref={this.onSvgRef.bind(this)}>
          {this.renderObjects()}
          {this.renderDrawingLines()}
          <g>
            {this.renderSelected()}
            {this.renderHovered()}
            {this.renderDragging()}
          </g>
        </svg>
        {this.renderDraggingHint()}
      </div>
    )
  }
}
export default DropTarget(DragTypes.WORKFLOW, canvasTarget, collect)(DiagramPanel)
