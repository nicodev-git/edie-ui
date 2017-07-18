import React, { Component } from 'react'
import InlineEdit from 'react-edit-inline'
import {Checkbox, RaisedButton} from 'material-ui'

import ImportSyncDataModal from './ImportSyncDataModal'
import SimulationModal from './SimulationModal'

const rowStyle = {
  float: 'left',
  width: '100%',
  height: 30
}

export default class MainSettings extends Component {
  getOption (key) {
    const list = (this.props.envVars || []).filter(u => u.envvars && u.envvars.key === key)
    if (list.length) return list[0]
    return null
  }

  getOptionValue (key, value = 'value1') {
    const option = this.getOption(key)
    if (!option) return ''
    return option.envvars[value]
  }

  onClickSync () {
    this.props.syncData()
  }

  onClickImportSync () {
    this.props.showImportSyncModal(true)
  }
  onCloseImportModal () {
    this.props.showImportSyncModal(false)
  }
  onClickSimulate () {
    this.props.showSimulationModal(true)
  }

  onChangeSendLogOption (e) {
    let {checked} = e.target
    this.updateOption('SEND_LOGS', `${checked}`)
  }

  renderImportModal () {
    if (!this.props.importSyncModalOpen) return null
    return (
      <ImportSyncDataModal
        onSubmit={this.props.importSyncData}
        onClose={this.onCloseImportModal.bind(this)}/>
    )
  }

  renderSimulationModal () {
    if (!this.props.simulationModalOpen) return null
    return (
      <SimulationModal {...this.props}/>
    )
  }

  render () {
    return (
      <div className="padding-md">
        <div style={rowStyle} className="margin-md-bottom bt-gray">
          <div className="pull-left width-220">
            <Checkbox
              label="Send IMP Logs to IMAdmin"
              checked={this.getOptionValue('SEND_LOGS') === 'true'}
              onCheck={this.onChangeSendLogOption.bind(this)}/>
          </div>
        </div>

        <div className="padding-md-top">
          <label className="margin-sm-right">Update The System</label>
          <RaisedButton label="Update" onTouchTap={this.onClickSync.bind(this)}/>
        </div>

        <div className="padding-md-top">
          <RaisedButton label="Import From File SyncData" onTouchTap={this.onClickImportSync.bind(this)}/>
        </div>

        <div className="padding-md-top">
          <RaisedButton label="Simulate" onTouchTap={this.onClickSimulate.bind(this)}/>
        </div>

        {this.renderImportModal()}
        {this.renderSimulationModal()}
      </div>
    )
  }
}
