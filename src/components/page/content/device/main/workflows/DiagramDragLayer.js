import React from 'react'
import { DragLayer } from 'react-dnd'

import { DragTypes } from 'shared/Global'

function collect (monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getClientOffset(),
    isDragging: monitor.isDragging()
  }
}

const layerStyles = {
  position: 'absolute',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
}

function getItemStyles (props) {
  const { currentOffset } = props
  if (!currentOffset) {
    return {
      display: 'none'
    }
  }

  console.log(currentOffset)
  const { x, y } = currentOffset
  return {
    position: 'absolute',
    left: `${x - 24}px`,
    top: `${y - 24}px`
  }
}

class DiagramDragLayer extends React.Component {
  renderItem (type, item, style) {
    switch (type) {
      case DragTypes.WORKFLOW:
        return (
          <img src={`/images/${item.img}`} width="48" height="48" style={style}/>
        )
    }
  }

  render () {
    const { item, itemType, isDragging } = this.props
    if (!isDragging) {
      return null
    }

    return (
      <div style={layerStyles}>
        {this.renderItem(itemType, item, getItemStyles(this.props))}
      </div>
    )
  }
}

export default DragLayer(collect)(DiagramDragLayer)
