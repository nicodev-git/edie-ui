import React, { Component } from 'react'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'
import ServerDetailTab from './ServerDetailTab'
import StatusImg from './StatusImg'
// import {findIndex} from 'lodash'

// import { extImageBaseUrl } from 'shared/Global'

export default class DeviceMonitors extends Component {
  renderMonitor (monitor) {
    const rows = []
    rows.push(
      <tr key={monitor.uid}>
        <td>
          {monitor.name}
        </td>
        <td>{monitor.monitortype}</td>
      </tr>
    )

    if (monitor.monitortype === 'basic') {
      const {basicMonitor} = monitor.params || {}
    }

    return rows
  }

  renderBody () {
    const {device} = this.props
    return (
      <div className="bg-white" style={{height: '100%', overflow: 'auto'}}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {(device.monitors || []).map(monitor => this.renderMonitor(monitor))}
          </tbody>
        </table>
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
