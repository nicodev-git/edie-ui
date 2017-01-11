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
    props.listener.onDrop(monitor.getItem(), monitor.getClientOffset())
  }
}

class DiagramPanel extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      cursorPos: {
        x: -100,
        y: -100
      }
    }
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextProps.dragItem.img && !this.props.dragItem.img) {
      this.setState({cursorPos: {x: -100, y: -100}})
    } else if (!nextProps.dragItem.img && this.props.dragItem.img) {
      this.setState({cursorPos: {x: -100, y: -100}})
    }
  }

  renderDrag () {
    const {cursorPos} = this.state
    const {dragItem} = this.props

    if (!dragItem || !dragItem.img) return null

    const width = 48

    return (
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}
           onClick={this.onDragMouseDown.bind(this)}>
        <img
          src={`/images/${dragItem.img}`}
          width={width}
          height={width}
          style={{
            position: 'absolute',
            left: cursorPos.x - width / 2,
            top: cursorPos.y - width / 2,
            cursor: 'url("/images/cursor_drag_hand.png") 15 15, auto'
          }}
        />
      </div>
    )
  }

  renderDropItem () {
    const {dropItem, dropItemPos} = this.props

    if (!dropItem || !dropItem.img) return null

    const width = 48
    const rt = this.containerEl.getClientRects()[0]
    if (!rt) return null

    return (
      <img src={`/externalpictures?name=${dropItem.img}`} width={width} height={width}
           style={{
             position: 'absolute',
             left: dropItemPos.x - rt.left - width / 2,
             top: dropItemPos.y - rt.top - width / 2
           }}
      />
    )
  }

  render () {
    const { connectDropTarget } = this.props

    const style = {backgroundColor: 'whitesmoke', height: '100%', position: 'relative'}
    return connectDropTarget(
      <div style={style} onClick={this.onClickContainer.bind(this)}>
        {this.renderDrag()}
        {this.renderDropItem()}
      </div>
    )
  }
}

export default DiagramPanel