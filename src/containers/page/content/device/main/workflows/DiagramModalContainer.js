import React from 'react'
import { connect } from 'react-redux'

import DiagramModal from 'components/page/content/device/main/workflows/DiagramModal'

import {
  closeDeviceWfDiagramModal,

  addDiagramObject,
  selectDiagramObject,
  setHoverDiagramObject,
  clearHoverDiagramObject,
  setHoverPoint,
  setDiagramMouseDown,
  setDiagramDragging,
  setDiagramCursorPos,
  moveDiagramSelectedObjects,
  setDiagramResizingPoint,
  setDiagramResizing
} from 'actions'

@connect(
  state => ({
    editWfDiagram: state.devices.editWfDiagram,
    objects: state.diagram.objects,
    lastId: state.diagram.lastId,

    backImg: state.diagram.backImg,

    selected: state.diagram.selected,
    hovered: state.diagram.hovered,
    hoverPoint: state.diagram.hoverPoint,
    isMouseDown: state.diagram.isMouseDown,
    mouseDownPos: state.diagram.mouseDownPos,
    mouseDownObject: state.diagram.mouseDownObject,
    resizePoint: state.diagram.resizePoint,
    isDragging: state.diagram.isDragging,
    cursorPos: state.diagram.cursorPos,
    isResizing: state.diagram.isResizing
  }), {
    closeDeviceWfDiagramModal,
    addDiagramObject,
    selectDiagramObject,
    setHoverDiagramObject,
    clearHoverDiagramObject,
    setHoverPoint,
    setDiagramMouseDown,
    setDiagramDragging,
    setDiagramCursorPos,
    moveDiagramSelectedObjects,
    setDiagramResizingPoint,
    setDiagramResizing
  }
)
export default class DiagramModalContainer extends React.Component {
  render () {
    return (
      <DiagramModal {...this.props} />
    )
  }
}
