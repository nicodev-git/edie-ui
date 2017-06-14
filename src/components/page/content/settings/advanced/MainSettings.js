import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import ImportSyncDataModal from './ImportSyncDataModal'

export default class MainSettings extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
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

  renderImportModal () {
    if (!this.props.importSyncModalOpen) return null
    return (
      <ImportSyncDataModal
        onSubmit={this.props.importSyncData}
        onClose={this.onCloseImportModal.bind(this)}/>
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

        {this.renderImportModal()}
      </div>
    )
  }
}
