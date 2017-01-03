import React from 'react'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'
import { assign } from 'lodash'

import TabPage from '../../../../shared/TabPage'
import TabPageBody from '../../../../shared/TabPageBody'
import TabPageHeader from '../../../../shared/TabPageHeader'

import DeviceEditWizardContainer from '../../../../../containers/shared/wizard/DeviceEditWizardContainer'
import { deviceTypeMap } from '../../../../shared/wizard/WizardConfig'

import { updateMapDevice } from '../../../../../actions'

class Info extends React.Component {
  constructor (props) {
    super(props)

    const {location} = props
    const loc = location.state || {}

    this.state = {
      device: loc.device
    }
  }

  renderContent () {
    const {device} = this.props

    let type = deviceTypeMap[device.type] || device.type || 'custom'
    let extraParams = {

    }

        // let values = $.extend(true, {}, device)
        // values['notes'] = values['devicenotes']

    return (
      <DeviceEditWizardContainer
        deviceType={type}
        values={device}
        extraParams={extraParams}
        onFinish={this.onFinish.bind(this)}
      />
    )
  }

  onFinish (params) {
    const device = assign({}, this.props.device, params)
    this.props.updateMapDevice(device)
  }

  render () {
    const {device} = this.props

    return (
      <TabPage>
        <TabPageHeader title={device.name} />
        <TabPageBody>
          {this.renderContent()}
        </TabPageBody>
      </TabPage>
    )
  }
}

Info.defaultProps = {

}

function mapStateToProps (state) {
  return {device: state.dashboard.selectedDevice}
}

export default withRouter(connect(mapStateToProps, {updateMapDevice})(Info))
// export default withRouter(Info)
