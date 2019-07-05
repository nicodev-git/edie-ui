import React from 'react'
import { assign } from 'lodash'

import DeviceEditWizardContainer from 'containers/shared/wizard/DeviceEditWizardContainer'
import { deviceTypeMap } from 'components/common/wizard/WizardConfig'
import RefreshOverlay from 'components/common/RefreshOverlay'

export default class Info extends React.Component {
  componentDidMount () {
    this.props.updateDeviceCreds(this.props.device.credentials || [])
  }
  onFinish (params) {
    const device = assign({}, this.props.device, params)
    this.props.updateMapDevice(device)
  }

  renderOverlay () {
    const {device, installAgents} = this.props
    let installAgent = installAgents.filter(a => a.id === device.id)
    installAgent = installAgent.length ? installAgent[0] : null
    const installing = installAgent && installAgent.status === 'installing'
    if (!installing) return null
    return <RefreshOverlay/>
  }

  render () {
    const {device} = this.props

    const type = deviceTypeMap[device.type] || device.type || 'custom'
    const extraParams = {}

    return (
      <div>
        <div className="tab-header">
          <div><span className="tab-title">{device.name}</span></div>
        </div>
        <DeviceEditWizardContainer
          deviceType={type}
          values={device}
          extraParams={extraParams}
          onFinish={this.onFinish.bind(this)}
        />
        {this.renderOverlay()}
      </div>

    )
  }
}
