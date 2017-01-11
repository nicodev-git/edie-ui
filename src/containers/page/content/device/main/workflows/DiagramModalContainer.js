import React from 'react'
import { connect } from 'react-redux'

import DiagramModal from 'components/page/content/device/main/workflows/DiagramModal'

import {
  closeDeviceWfDiagramModal
} from 'actions'

@connect(
  state => ({
    editWfDiagram: state.devices.editWfDiagram,
    initialValues: state.devices.editWfDiagram
  }), {
    closeDeviceWfDiagramModal
  }
)
export default class DiagramModalContainer extends React.Component {
  render () {
    return (
      <DiagramModal {...this.props} />
    )
  }
}
