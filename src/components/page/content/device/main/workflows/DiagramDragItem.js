import React from 'react'

import { DragSource } from 'react-dnd'
import { DragTypes } from 'shared/Global'

const dragSource = {
  beginDrag (props) {
    const item = {
      img: props.img,
      title: props.title,
      type: props.type
    }
    return item
  },

  endDrag () {
  }

}

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }
}

class DiagramDragItem extends React.Component {
  render () {
    const { connectDragSource } = this.props

    return (
      connectDragSource(
        <a href="javascript:;" className="sidebar-item">
          {this.props.children}
        </a>
      )
    )
  }
}

DiagramDragItem.defaultProps = {
  img: '',
  type: '',
  title: ''
}

export default DragSource(DragTypes.WORKFLOW, dragSource, collect)(DiagramDragItem)
