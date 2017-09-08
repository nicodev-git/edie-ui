import React from 'react'
import {findIndex} from 'lodash'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'
import ServerDetailTab from './ServerDetailTab'

import GaugeMap from 'components/common/gauge/GaugeMap'

export default class MainControl extends React.Component {
  getDeviceId () {
    return this.props.match.params.id
  }

  getDevice () {
    const {devices} = this.props
    const index = findIndex(devices, {id: this.getDeviceId()})
    if (index < 0) return null
    return devices[index]
  }

  render () {
    const device = this.getDevice()
    return (
      <TabPage>
        <TabPageHeader title={device.name}>
        </TabPageHeader>
        <TabPageBody tabs={ServerDetailTab(device.id, device.templateName)} history={this.props.history} location={this.props.location} transparent>
        </TabPageBody>
      </TabPage>
    )
  }
}
