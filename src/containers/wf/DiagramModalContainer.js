import React from 'react'
import {connect} from 'react-redux'

import DiagramModal from 'components/sidebar/wf/DiagramModal'

import {
  closeDeviceWfDiagramModal,

  addDiagramObject,
  updateDiagramObject,
  selectDiagramObject,
  setHoverDiagramObject,
  clearHoverDiagramObject,
  setHoverPoint,
  setDiagramMouseDown,
  setDiagramDragging,
  setDiagramCursorPos,
  moveDiagramSelectedObjects,
  setDiagramResizingPoint,
  setDiagramResizing,
  resizeDiagramSelectedObjects,
  setDiagramLineDrawing,
  setDiagramLineStartPoint,
  setDiagramLineEndPoint,
  setDiagramLineStepPoint,
  addDiagramLine,
  updateDiagramLine,

  openDiagramObjectModal,
  closeDiagramObjectModal,
  removeDiagramSelectedObjects,

  showFillColorPicker,
  changePickerColor
} from 'actions'

class DiagramModalContainer extends React.Component {
  render () {
    let {diagram, stateId} = this.props
    diagram = diagram[stateId]
    if (!diagram) return null
    const state = {
      flow: diagram.flow,
      flowId: diagram.flowId,

      objects: diagram.objects,
      lastId: diagram.lastId,

      flowItemModalOpen: diagram.flowItemModalOpen,

      selected: diagram.selected,
      hovered: diagram.hovered,
      hoverPoint: diagram.hoverPoint,
      isMouseDown: diagram.isMouseDown,
      mouseDownPos: diagram.mouseDownPos,
      mouseDownObject: diagram.mouseDownObject,
      resizePoint: diagram.resizePoint,
      isDragging: diagram.isDragging,
      cursorPos: diagram.cursorPos,
      isResizing: diagram.isResizing,

      lines: diagram.lines,
      isLineDrawing: diagram.isLineDrawing,
      isLineDrawingStart: diagram.isLineDrawingStart,
      drawingLine: diagram.drawingLine,
      lineStart: diagram.lineStart,
      lineEnd: diagram.lineEnd,
      lineStartObject: diagram.lineStartObject,
      lineStartObjectPoint: diagram.lineStartObjectPoint,
      lineEndObject: diagram.lineEndObject,
      lineEndObjectPoint: diagram.lineEndObjectPoint,
      lineStepPoint: diagram.lineStepPoint,

      objectModalOpen: diagram.objectModalOpen,
      objectConfig: diagram.objectConfig,
      objectTpl: diagram.objectTpl,

      fillColorPickerOpen: diagram.fillColorPickerOpen,
      pickerColor: diagram.pickerColor
    }

    return (
      <DiagramModal {...this.props} {...state}/>
    )
  }
}
export default connect(
  state => ({
    diagram: state.diagram
  }), {
    closeDeviceWfDiagramModal,
    addDiagramObject,
    updateDiagramObject,

    selectDiagramObject,
    setHoverDiagramObject,
    clearHoverDiagramObject,
    setHoverPoint,
    setDiagramMouseDown,
    setDiagramDragging,
    setDiagramCursorPos,
    moveDiagramSelectedObjects,
    setDiagramResizingPoint,
    setDiagramResizing,
    resizeDiagramSelectedObjects,
    setDiagramLineDrawing,
    setDiagramLineStartPoint,
    setDiagramLineEndPoint,
    setDiagramLineStepPoint,
    addDiagramLine,
    updateDiagramLine,
    removeDiagramSelectedObjects,

    openDiagramObjectModal,
    closeDiagramObjectModal,

    showFillColorPicker,
    changePickerColor
  }
)(DiagramModalContainer)
