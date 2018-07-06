import React, { Component } from 'react'
import {keys} from 'lodash'
import {Chip} from '@material-ui/core'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'
import ServerDetailTab from './ServerDetailTab'
import StatusImg from './StatusImg'
import ParamEditModal from './ParamEditModal'

import {thresholdKeys} from 'shared/MonitorConst'

export default class DeviceMonitors extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paramModalOpen: false,
      editParam: null
    }
  }

  ////////////////////////////////////////////////////////////

  onClickParam (context, key, value) {
    this.setState({
      editParamContext: context,
      editParam: {key, value},
      paramModalOpen: true
    })
  }

  onCloseParamEdit () {
    this.setState({
      paramModalOpen: false
    })
  }

  ////////////////////////////////////////////////////////////

  renderParams (monitortype, params, context) {
    const itemKeys = thresholdKeys[monitortype] || []
    return (
      <div>
        {itemKeys.map(p =>
          <Chip key={p} label={`${p} = ${params[p] ||  ''}`} onClick={() => this.onClickParam(context, p, params[p])}/>
        )}
      </div>
    )
  }

  renderMonitor (monitor) {
    const rows = []
    rows.push(
      <tr key={monitor.uid}>
        <td>{monitor.monitortype}</td>
        <td>{this.renderParams(monitor.monitortype, monitor.params, {type: 'normal', monitor})}</td>
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
                {this.renderParams(basicMonitorType, basicMonitor[basicMonitorType] || {}, {type: 'basic', monitor, basicMonitorType})}
              </td>
            </tr>
          )
        })
      }
    }

    return rows
  }

  renderParamEditModal () {
    if (!this.props.paramModalOpen) return null
    return (
      <ParamEditModal
        hideDefaults
        editParam={this.state.editParam}
        onClose={this.onCloseParamEdit.bind(this)}
      />
    )
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
          {this.renderParamEditModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}
