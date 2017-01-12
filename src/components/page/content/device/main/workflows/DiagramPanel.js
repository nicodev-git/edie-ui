import React from 'react'
import {
  DropTarget
} from 'react-dnd'

import { DragTypes, workflowItems } from 'shared/Global'

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
  constructor (props) {
    super(props)
    this.state = {
      objects: [],
      lastId: 100
    }
  }

  renderObject (obj) {
    const style = {
      position: 'absolute',
      left: `${obj.x}px`,
      top: `${obj.y}px`,
      width: `${obj.w}px`,
      height: `${obj.h}px`
    }

    return (
      <svg style={style}>
        {workflowItems[obj.imgIndex]}
      </svg>
    )
  }

  renderObjects () {
    const { objects } = this.state

    return objects.map(obj => this.renderObject(obj))
  }

  render () {
    const { connectDropTarget } = this.props

    return connectDropTarget(
      <div className="draw-panel">
        {this.renderObjects()}
      </div>
    )
  }
}
export default DropTarget(DragTypes.WORKFLOW, canvasTarget, collect)(DiagramPanel)
