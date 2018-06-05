import React from 'react'
import { assign } from 'lodash'

import DeviceEditWizardContainer from 'containers/shared/wizard/DeviceEditWizardContainer'
import { deviceTypeMap } from 'components/common/wizard/WizardConfig'
import RefreshOverlay from 'components/common/RefreshOverlay'

export default class EditServer extends React.Component {
  componentWillMount () {
    // const {userInfo} = this.props
    // if (!(userInfo && userInfo.permissions && userInfo.permissions.includes('EditServer'))) {
    //   this.props.history.push('/')
    //   return
    // }
  }
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
    const {device, history} = this.props

    const type = deviceTypeMap[device.type] || device.type || 'custom'
    const extraParams = {}

    return (
      <div>
        <DeviceEditWizardContainer
          history={history}
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
