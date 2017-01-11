import React from 'react'
import {
  DropTarget
} from 'react-dnd'

import { DragTypes } from 'shared/Global'

function collect (connect) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

const canvasTarget = {
  canDrop () {
    return true
  },

  drop (props, monitor) {
    props.onDrop(monitor.getItem(), monitor.getClientOffset())
  }
}

class DiagramPanel extends React.Component {
  render () {
    const { connectDropTarget } = this.props

    const style = {backgroundColor: 'whitesmoke', height: '100%', position: 'relative'}
    return connectDropTarget(
      <div style={style}>

      </div>
    )
  }
}
export default DropTarget(DragTypes.WORKFLOW, canvasTarget, collect)(DiagramPanel)
