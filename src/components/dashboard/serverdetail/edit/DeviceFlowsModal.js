import React from 'react'
import {findIndex} from 'lodash'

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
    // const {device} = this.props
    // this.props.fetchDeviceWorkflows({
    //   uuid: device.workflowids || []
    // })
    this.props.fetchWorkflows()
  }

  onClickShowPicker () {
    this.setState({
      flowPickerOpen: true
    })
  }

  onClickAddWf (wf) {
    const {device} = this.props
    let {workflowids} = device

    this.setState({
      flowPickerOpen: false
    })

    if (!workflowids) workflowids = []
    if (workflowids.indexOf(wf.uuid) >= 0) return
    workflowids = [...workflowids, wf.uuid]

    this.props.updateMapDevice({
      ...device,
      workflowids
    })
  }

  getDeviceWorkflows () {
    const {workflows, device} = this.props
    const {workflowids} = device
    if (!workflowids) return []

    const found = []
    workflowids.forEach(uuid => {
      const index = findIndex(workflows, {uuid})
      if (index >= 0) found.push(workflows[index])
    })

    return found
  }

  renderFlowPicker () {
    if (!this.state.flowPickerOpen) return
    return (
      <FlowPickerModal
        fetchWorkflows={this.props.fetchWorkflows}
        workflows={this.props.workflows}
        onClickOK={this.onClickAddWf.bind(this)}
        onClickClose={() => this.setState({flowPickerOpen: false})}
      />
    )
  }

  render () {
    return (
      <DeviceFlowsModalView
        {...this.props}
        deviceWorkflows={this.getDeviceWorkflows()}
        onClickAdd={this.onClickShowPicker.bind(this)}
      >
        {this.renderFlowPicker()}
      </DeviceFlowsModalView>
    )
  }
}