import React from 'react'

import { getDeviceType } from 'components/common/wizard/WizardConfig'
import DeviceEditModal from 'containers/shared/wizard/DeviceEditModalContainer'
import {showAlert} from 'components/common/Alert'
import {checkAgentUp} from 'shared/Global'

export default class StatusImg extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      up: false
    }

  }
  onClickFix () {
    const {device} = this.props.device
    if (!device.agentType) {
      this.props.showDeviceEditModal(true, this.props.device)
      return
    }
    if (device.agentType === 'agent') {
      if (!device.agent) {
        this.props.showDeviceEditModal(true, this.props.device)
        return;
      }
      showAlert('Please check credentials')
    } else {

    }
  }
  onFinishEdit (device) {
    this.props.updateMapDevice(device)
  }

  componentWillMount () {
    checkAgentUp(this.props.device.id, up => {
      this.setState({up})
    })
  }

  ///////////////////////////////////////////
  renderDeviceEditModal () {
    const {editDevice, deviceEditModalOpen} = this.props
    if (!deviceEditModalOpen) return null

    return (
      <DeviceEditModal
        deviceType={`${getDeviceType(editDevice.templateName)}-edit`}
        title={editDevice.name}
        monitors={editDevice.monitors}
        onClose={() => this.props.showDeviceEditModal(false)}
        onFinish={this.onFinishEdit.bind(this)}
      />
    )
  }

  render () {
    const {device, onClickFix} = this.props
    if (!device) return null
    const {up} = this.state
    if (up) return null
    return (
      <span className="valign-middle margin-md-left">
        <img
          src="/resources/images/dashboard/bell.png"
          alt=""
          width={24}
          className="valign-middle margin-sm-right"
          style={{marginTop: -3}}/>
        No Agent/Collector not defined
        <span className="link margin-md-left text-primary" onClick={onClickFix || this.onClickFix.bind(this)}>Fix</span>

        {this.renderDeviceEditModal()}
      </span>
    )
  }
}
