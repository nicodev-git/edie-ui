import React from 'react'

import DeviceFlowsModalView from './DeviceFlowsModalView'

export default class DeviceFlowsModal extends React.Component {
  componentWillMount () {
    const {device} = this.props
    this.props.fetchDeviceWorkflows({
      uuid: device.workflowids || []
    })
  }
  render () {
    return (
      <DeviceFlowsModalView
        {...this.props}
      />
    )
  }
}