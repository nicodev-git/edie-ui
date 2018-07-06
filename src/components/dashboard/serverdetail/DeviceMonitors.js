import React, { Component } from 'react'
import {keys} from 'lodash'
import {Chip} from '@material-ui/core'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'
import ServerDetailTab from './ServerDetailTab'
import StatusImg from './StatusImg'

import {thresholdKeys} from 'shared/MonitorConst'

export default class DeviceMonitors extends Component {
  onClickParam(type, key, value) {

  }

  renderParams (monitortype, params) {
    const itemKeys = thresholdKeys[monitortype] || []
    return (
      <div>
        {itemKeys.map(p =>
          <Chip key={p} label={`${p} = ${params[p] ||  ''}`}/>
        )}
      </div>
    )
  }

  renderMonitor (monitor) {
    const rows = []
    rows.push(
      <tr key={monitor.uid}>
        <td>{monitor.monitortype}</td>
        <td>{this.renderParams(monitor.monitortype, monitor.params)}</td>
      </tr>
    )

    if (monitor.monitortype === 'basic') {
      const {basicMonitor} = monitor.params || {}
      if (basicMonitor) {
        keys(basicMonitor).forEach(basicMonitorType => {
          rows.push(
            <tr key={monitor.uid + '-' + basicMonitorType}>
              <td>
                <span className="padding-md-left">{basicMonitorType}</span>
              </td>
              <td>
                {this.renderParams(basicMonitorType, basicMonitor[basicMonitorType] || {})}
              </td>
            </tr>
          )
        })
      }
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
              <th>Type</th>
              <th>Config</th>
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
