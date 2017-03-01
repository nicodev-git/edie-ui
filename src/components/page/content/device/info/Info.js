import React from 'react'
import { assign } from 'lodash'

import DeviceEditWizardContainer from '../../../../../containers/shared/wizard/DeviceEditWizardContainer'
import { deviceTypeMap } from '../../../../shared/wizard/WizardConfig'

export default class Info extends React.Component {
  constructor (props) {
    super(props)

    const { location } = props
    const loc = location.state || {}

    this.state = {
      device: loc.device
    }
  }

  onFinish (params) {
    const device = assign({}, this.props.device, params)
    this.props.updateMapDevice(device)
  }

  render () {
    const {device} = this.props

    let type = deviceTypeMap[device.type] || device.type || 'custom'
    let extraParams = {

    }

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
      </div>

    )
  }
}
