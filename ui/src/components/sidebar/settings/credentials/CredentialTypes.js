import React from 'react'
import {RaisedButton} from 'material-ui'

import InfiniteTable from 'components/common/InfiniteTable'
import { showAlert, showConfirm } from 'components/common/Alert'

import CredentialTypeModal from './CredentialTypeModal'

import SettingTabs from '../SettingTabs'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import UserTabs from '../users/UserTabs'

export default class CredentialTypes extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }

    this.cells = [{
      'displayName': 'Type',
      'columnName': 'name'
    }]
  }

  renderContent () {
    return (
      <InfiniteTable
        url="/credentialtype"
        cells={this.cells}
        ref="table"
        rowMetadata={{'key': 'id'}}
        selectable
        params={{
          draw: this.props.credentialTypeDraw
        }}
      />
    )
  }

  renderCredentialsModal () {
    if (!this.props.credTypeModalVisible) return null
    return (
      <CredentialTypeModal {...this.props}/>
    )
  }

  getTable () {
    return this.refs.credentials
  }

  onAddCred () {
    this.props.openCredentialsModal()
  }

  onEditCred () {
    let selected = this.getTable().getSelected()
    if (!selected) return showAlert('Please choose credentials.')

    this.props.openCredentialsModal(selected)
  }

  onRemoveCred () {
    let selected = this.getTable().getSelected()
    if (!selected) return showAlert('Please choose credentials.')

    showConfirm('Are you sure? Click OK to remove.', (btn) => {
      if (btn !== 'ok') return

      this.props.removeCredentials(selected)
    })
  }
  render () {
    return (
      <TabPage>
        <TabPageHeader title="Credential Types">
          <div className="text-center margin-md-top">
            <div className="pull-right">
              <RaisedButton label="Add" onTouchTap={this.onAddCred.bind(this)}/>&nbsp;
              <RaisedButton label="Edit" onTouchTap={this.onEditCred.bind(this)}/>&nbsp;
              <RaisedButton label="Remove" onTouchTap={this.onRemoveCred.bind(this)}/>&nbsp;
              <UserTabs history={this.props.history}/>&nbsp;
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={5} history={this.props.history} location={this.props.location}>
          {this.renderContent()}
          {this.renderCredentialsModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}
