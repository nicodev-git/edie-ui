import React from 'react'

import DeviceFlowsModalView from './DeviceFlowsModalView'
import FlowPickerModal from './FlowPickerModal'

export default class DeviceFlowsModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      flowPickerOpen: false
    }
  }

  componentWillMount () {
    const {device} = this.props
    this.props.fetchDeviceWorkflows({
      uuid: device.workflowids || []
    })
  }

  onClickAdd () {
    this.setState({
      flowPickerOpen: true
    })
  }

  renderFlowPicker () {
    if (!this.state.flowPickerOpen) return
    return (
      <FlowPickerModal
        onClickClose={() => this.setState({flowPickerOpen: false})}
      />
    )
  }

  render () {
    return (
      <DeviceFlowsModalView
        {...this.props}
        onClickAdd={this.onClickAdd.bind(this)}
      >
        {this.renderFlowPicker()}
      </DeviceFlowsModalView>
    )
  }
}