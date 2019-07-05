import React, { Component } from 'react'
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
      editParamContext: null,
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

  onSaveParam (param) {
    const {device} = this.props
    const {editParamContext} = this.state

    this.onCloseParamEdit()
    let monitor = device.monitors.filter(p => p.uid === editParamContext.monitor.uid)[0]
    if (!monitor) return

    monitor = {
      ...monitor,
      params: {
        ...monitor.params,
        [param.key]: param.value
      }
    }

    this.props.updateMapDevice({
      ...device,
      monitors: device.monitors.map(p => p.uid === monitor.uid ? monitor : p)
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
    return (
      <tr key={monitor.uid}>
        <td>{monitor.monitortype}</td>
        <td>{this.renderParams(monitor.monitortype, monitor.params, {monitor})}</td>
      </tr>
    )
  }

  renderParamEditModal () {
    if (!this.state.paramModalOpen) return null
    return (
      <ParamEditModal
        hideDefaults
        editParam={this.state.editParam}
        onClose={this.onCloseParamEdit.bind(this)}
        onSave={this.onSaveParam.bind(this)}
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
