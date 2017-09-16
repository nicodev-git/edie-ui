import React from 'react'
import axios from 'axios'

import { getDeviceType } from 'components/common/wizard/WizardConfig'
import DeviceEditModal from 'containers/shared/wizard/DeviceEditModalContainer'

export default class StatusImg extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      up: false
    }

  }
  onClickFix () {
    this.props.showDeviceEditModal(true, this.props.device)
  }
  onFinishEdit (device) {
    this.props.updateMapDevice(device)
  }

  componentWillMount () {
    axios.get('')
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
    const up = device.agent && (new Date().getTime() - device.agent.lastSeen) < 3 * 60 * 1000
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
