import React from 'react'

import DeviceFlowsModalView from './DeviceFlowsModalView'
import FlowPickerModal from './FlowPickerModal'

export default class DeviceFlowsModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  componentWillMount () {
    const {device} = this.props
    this.props.fetchDeviceWorkflows({
      uuid: device.workflowids || []
    })
  }

  renderFlowPicker () {

  }

  render () {
    return (
      <DeviceFlowsModalView
        {...this.props}>
        {this.renderFlowPicker()}
      </DeviceFlowsModalView>
    )
  }
}