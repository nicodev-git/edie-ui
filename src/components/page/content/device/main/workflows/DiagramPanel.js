import React from 'react'
import {
  DropTarget
} from 'react-dnd'

import { DragTypes } from 'shared/Global'

import DRect from './diagram/DRect'
import DRoundRect from './diagram/DRoundRect'
import DEllipse from './diagram/DEllipse'
import DDiamond from './diagram/DDiamond'

function collect (connect) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

const objectComponents = [DRect, DRoundRect, DEllipse, DDiamond]

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
    const ItemObject = objectComponents[obj.imgIndex] || DRect

    return (
      <ItemObject key={obj.id} {...obj} />
    )
  }

  renderObjects () {
    const { objects } = this.props

    return objects.map(obj => this.renderObject(obj))
  }

  render () {
    const { connectDropTarget, backImg } = this.props

    const style = {
      backgroundImage: `url(data:image/svg+xml;base64,${backImg})`,
      position: 'absolute',
      width: '100%',
      height: '100%',
      // backgroundPosition: '-15px -26px',
      backgroundColor: 'rgb(255, 255, 255)'
    }
    return connectDropTarget(
      <div className="draw-panel">
        <svg style={style}>
          {this.renderObjects()}
        </svg>

      </div>
    )
  }
}
export default DropTarget(DragTypes.WORKFLOW, canvasTarget, collect)(DiagramPanel)
