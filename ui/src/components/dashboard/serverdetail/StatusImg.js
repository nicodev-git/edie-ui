import React from 'react'

import { getDeviceType } from 'components/common/wizard/WizardConfig'
import DeviceEditModal from 'containers/shared/wizard/DeviceEditModalContainer'
// import {showAlert} from 'components/common/Alert'
import {checkAgentUp} from 'shared/Global'
import DeviceFixModal from 'containers/dashboard/serverdetail/DeviceFixModalContainer'

export default class StatusImg extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      up: false,
      info: '',
      resCode: 0
    }

  }
  onClickFix () {
    const {device} = this.props
    const {resCode} = this.state
    this.props.showDeviceFixModal(true, device, resCode)
  }
  onFinishEdit (device) {
    this.props.updateMapDevice(device)
    setTimeout(() => {
      this.checkState()
    }, 200)
  }

  componentWillMount () {
    this.checkState()
  }

  checkState () {
    checkAgentUp(this.props.device.id, (up, info, resCode) => {
      this.setState({up, info, resCode})
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

  renderDeviceFixModal () {
    if (!this.props.deviceFixModalOpen) return null
    return (
      <DeviceFixModal/>
    )
  }

  render () {
    const {device, onClickFix} = this.props
    if (!device) return null
    const {up, info} = this.state
    if (up) return null
    return (
      <span className="valign-middle margin-md-left">
        <img
          src="/resources/images/dashboard/bell.png"
          alt=""
          width={24}
          className="valign-middle margin-sm-right"
          style={{marginTop: -3}}/>
        {info}
        <span className="link margin-md-left text-primary" onClick={onClickFix || this.onClickFix.bind(this)}>Fix</span>

        {this.renderDeviceEditModal()}
        {this.renderDeviceFixModal()}
      </span>
    )
  }
}
