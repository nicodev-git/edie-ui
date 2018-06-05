import React from 'react'

import {checkAgentUp} from 'shared/Global'
import DeviceFixModal from 'containers/dashboard/serverdetail/DeviceFixModalContainer'

export default class StatusImg extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      up: false,
      loading: true,
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

  componentWillUpdate (nextProps) {
    const {device} = this.props
    if (nextProps.device && (!device || device.agentType !== nextProps.device.agentType)) {
      this.checkState(nextProps.device)
    }
  }

  checkState (device) {
    checkAgentUp(device ? device.id : this.props.device.id, (up, info, resCode) => {
      this.setState({up, info, resCode, loading: false})
    })
  }

  onCloseDeviceFix () {
    this.checkState()
  }

  ///////////////////////////////////////////

  renderDeviceFixModal () {
    if (!this.props.deviceFixModalOpen) return null
    return (
      <DeviceFixModal onClose={this.onCloseDeviceFix.bind(this)}/>
    )
  }

  renderBell () {
    const {device, onClickFix} = this.props
    if (!device) return null
    const {up, info, loading} = this.state
    if (up || loading) return null

    return (
      <span>
        <img
          src="/resources/images/dashboard/bell.png"
          alt=""
          width={24}
          className="valign-middle margin-sm-right"
          style={{marginTop: -3}}/>
        {info}
        <span className="link margin-md-left text-primary" onClick={onClickFix || this.onClickFix.bind(this)}>Fix</span>
      </span>
    )
  }

  render () {

    return (
      <span className="valign-middle margin-md-left">
        {this.renderBell()}
        {this.renderDeviceFixModal()}
      </span>
    )
  }
}
