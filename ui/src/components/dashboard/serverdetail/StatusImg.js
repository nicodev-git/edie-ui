import React from 'react'

import { getDeviceType } from 'components/common/wizard/WizardConfig'
import DeviceEditModal from 'containers/shared/wizard/DeviceEditModalContainer'
import {showAlert} from 'components/common/Alert'
import {checkAgentUp} from 'shared/Global'

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

    let msg = ''

    switch (resCode) {
      case 1:
        msg = 'No Agent/Collector defined. Please edit device and choose agent or collector. If you need agent, click "Install" button to install agent. Otherwise, please choose collector.'
        showAlert(msg, () => {
          this.props.showDeviceEditModal(true, device)
        })
        break
      case 2:
        msg = 'No login credentials found. Please add SSH credentials.'
        showAlert(msg, () => {
          this.props.showDeviceCredsModal(true, device)
        })
        break
      case 3:
        msg = 'Please choose linux os name.'
        showAlert(msg, () => {
          this.props.showDeviceEditModal(true, device)
        })
        break
      case 4:
        msg = 'Failed to check device with current credentials. Please check if credentials are correct.'
        showAlert(msg, () => {
          this.props.showDeviceCredsModal(true, device)
        })
        break
    }
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
      </span>
    )
  }
}
