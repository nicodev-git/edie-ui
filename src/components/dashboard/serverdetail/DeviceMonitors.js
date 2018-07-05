import React, { Component } from 'react'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'
import ServerDetailTab from './ServerDetailTab'
import StatusImg from './StatusImg'

export default class DeviceMonitors extends Component {
  renderBody () {
    return (
      <div>
        Monitors
      </div>
    )
  }

  render () {
    const {device} = this.props
    return (
      <TabPage>
        <TabPageHeader title="Monitors" useToolBar titleOptions={<StatusImg device={device}/>}>
        </TabPageHeader>
        <TabPageBody tabs={ServerDetailTab(device.slug, device.templateName)} history={this.props.history} location={this.props.location} transparent>
          {this.renderBody()}
        </TabPageBody>
      </TabPage>
    )
  }
}
