import React from 'react'
import { connect } from 'react-redux'

import DiagramModal from 'components/page/content/device/main/workflows/DiagramModal'

import {
  closeDeviceWfDiagramModal,

  addDiagramObject,
  selectDiagramObject,
  setHoverDiagramObject,
  clearHoverDiagramObject,
  setHoverPoint
} from 'actions'

@connect(
  state => ({
    editWfDiagram: state.devices.editWfDiagram,
    objects: state.diagram.objects,
    lastId: state.diagram.lastId,

    backImg: state.diagram.backImg,

    selected: state.diagram.selected,
    hovered: state.diagram.hovered,
    hoverPoint: state.diagram.hoverPoint
  }), {
    closeDeviceWfDiagramModal,
    addDiagramObject,
    selectDiagramObject,
    setHoverDiagramObject,
    clearHoverDiagramObject,
    setHoverPoint
  }
)
export default class DiagramModalContainer extends React.Component {
  render () {
    return (
      <DiagramModal {...this.props} />
    )
  }
}
