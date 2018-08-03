import React, { Component } from 'react'
import {assign} from 'lodash'
import {Checkbox, Button, Select, MenuItem} from '@material-ui/core'
import { FormControlLabel } from '@material-ui/core'
import { FormControl } from '@material-ui/core'
import { InputLabel } from '@material-ui/core'

import ImportSyncDataModal from './ImportSyncDataModal'
import SimulationModal from './SimulationModal'

const rowStyle = {
  float: 'left',
  width: '100%',
  height: 50
}

const logLevels = [{
  label: 'INFO', value: 'INFO'
}, {
  label: 'DEBUG', value: 'DEBUG'
}, {
  label: 'ERROR', value: 'ERROR'
}]
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

  updateOption (name, value1, value2 = '') {
    if (!name) return false

    let option = this.getOption(name)
    if (!option) {
      option = {
        envvars: {
          'key': name,
          'value1': value1,
          'value2': value2
        }
      }

      this.props.addEnvVar(option)
    } else {
      assign(option.envvars, { value1, value2 })

      this.props.updateEnvVar(option)
    }
  }

  onClickSync () {
    this.props.syncData(false)
  }

  onClickSyncAll () {
    this.props.syncData(true)
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
    const {checked} = e.target
    this.updateOption('SEND_LOGS', `${checked}`)
  }

  onChangeSendLogLevel (e) {
    this.updateOption('SEND_LOGS_LEVEL', e.target.value)
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
    const {canEdit} = this.props
    return (
      <div>
        <div style={rowStyle} className="margin-md-bottom bt-gray">
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.getOptionValue('SEND_LOGS') === 'true'}
                  onChange={this.onChangeSendLogOption.bind(this)}
                  disabled={!canEdit}
                />
              }
              label="Send IMP Logs to IMAdmin"
            />
          </div>
        </div>
        <div>
          <FormControl style={{width: 200}}>
            <InputLabel>Send IMP Logs Level</InputLabel>
            <Select
              value={this.getOptionValue('SEND_LOGS_LEVEL')}
              onChange={this.onChangeSendLogLevel.bind(this)}
              disabled={!canEdit}
            >
              {logLevels.map(option => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
        {canEdit && <div>
          <div className="padding-md-top">
            <label className="margin-sm-right">Update The System</label>
            <Button variant="raised" onClick={this.onClickSync.bind(this)}>Update</Button>

            <Button variant="raised" onClick={this.onClickSyncAll.bind(this)} className="margin-lg-left">Sync All</Button>
          </div>

          <div className="padding-md-top">
            <Button variant="raised" onClick={this.onClickImportSync.bind(this)}>Import From File SyncData</Button>
          </div>

          <div className="padding-md-top">
            <Button variant="raised" onClick={this.onClickSimulate.bind(this)}>Simulate</Button>
          </div>
        </div>}

        {this.renderImportModal()}
        {this.renderSimulationModal()}
      </div>
    )
  }
}
