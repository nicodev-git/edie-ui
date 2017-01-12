import React from 'react'
import {
  DropTarget
} from 'react-dnd'

import { DragTypes } from 'shared/Global'

import DRect from './diagram/DRect'

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
  renderObject (obj) {
    return (
      <DRect {...obj} />
    )
  }

  renderObjects () {
    const { objects } = this.props

    return objects.map(obj => this.renderObject(obj))
  }

  render () {
    const { connectDropTarget } = this.props

    return connectDropTarget(
      <div className="draw-panel">
        <svg style={{position: 'absolute', width: '100%', height: '100%'}}>
          {this.renderObjects()}
        </svg>

      </div>
    )
  }
}
export default DropTarget(DragTypes.WORKFLOW, canvasTarget, collect)(DiagramPanel)
