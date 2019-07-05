import React from 'react'

import { DragSource } from 'react-dnd'
import { DragTypes } from 'shared/Global'

const dragSource = {
    beginDrag (props) {
        const item = {
            imgIndex: props.imgIndex
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
            <div className="link sidebar-item" title={this.props.title}>
              {this.props.children}
            </div>
          )
        )
    }
}

DiagramDragItem.defaultProps = {
    imgIndex: 0
}

export default DragSource(DragTypes.WORKFLOW, dragSource, collect)(DiagramDragItem)
