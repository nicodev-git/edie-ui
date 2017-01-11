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

function getItemStyles (currentOffset) {
  if (!currentOffset) {
    return {
      display: 'none'
    }
  }

  const { x, y } = currentOffset
  return {
    position: 'absolute',
    left: `${x - 24}px`,
    top: `${y - 24}px`
  }
}

class DiagramDragLayer extends React.Component {

  onRefContainer (el) {
    this.containerEl = el
  }

  renderItem (type, item, style) {
    switch (type) {
      case DragTypes.WORKFLOW:
        return (
          <img src={`/images/${item.img}`} width="48" height="48" style={style}/>
        )
    }
  }

  render () {
    const { item, itemType, isDragging, currentOffset } = this.props
    if (!isDragging) {
      return null
    }

    const rt = this.containerEl ? this.containerEl.getClientRects()[0] : {left: 0, top: 0}

    return (
      <div style={layerStyles} ref={this.onRefContainer.bind(this)}>
        {this.renderItem(itemType, item, getItemStyles({
          x: currentOffset.x - rt.left,
          y: currentOffset.y - rt.top
        }))}
      </div>
    )
  }
}

export default DragLayer(collect)(DiagramDragLayer)
