import React, { Component } from 'react'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'
import ServerDetailTab from './ServerDetailTab'
import StatusImg from './StatusImg'

export default class DeviceMonitors extends Component {
  renderMonitor (monitor) {

  }

  renderBody () {
    const {device} = this.props
    return (
      <div className="bg-white" style={{height: '100%', overflow: 'auto'}}>
        Monitors
        {(device.monitors || []).map(monitor => this.renderMonitor(monitor))}
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
