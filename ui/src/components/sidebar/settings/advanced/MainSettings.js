import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import ImportSyncDataModal from './ImportSyncDataModal'

import SimulationModal from './SimulationModal'

export default class MainSettings extends Component {
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
