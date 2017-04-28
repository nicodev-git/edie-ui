import React from 'react'
import {RaisedButton, TextField} from 'material-ui'

import InfiniteTable from '../../../../shared/InfiniteTable'
import { showAlert, showConfirm } from '../../../../shared/Alert'

import CredentialModal from './CredentialModal'

import SettingTabs from '../SettingTabs'
import TabPage from 'components/shared/TabPage'
import TabPageBody from 'components/shared/TabPageBody'
import TabPageHeader from 'components/shared/TabPageHeader'
import { errorStyle, inputStyle, underlineStyle } from 'style/materialStyles'

export default class Credentials extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filter: ''
    }

    this.cells = [{
      'displayName': 'Name',
      'columnName': 'name'
    }, {
      'displayName': 'Description',
      'columnName': 'description'
    }, {
      'displayName': 'User Name',
      'columnName': 'username'
    }]
  }

  componentWillMount () {
    this.props.fetchCredentials()
  }

  renderContent () {
    return (
      <InfiniteTable
        cells={this.cells}
        ref="credentials"
        rowMetadata={{'key': 'id'}}
        selectable
        onRowDblClick={this.onEditCred.bind(this)}

        useExternal={false}
        data={this.props.credentials}
      />
    )
  }

  renderCredentialsModal () {
    if (!this.props.credentialsModalVisible) return null
    return (
      <CredentialModal {...this.props}/>
    )
  }

  getTable () {
    return this.refs.credentials
  }

  onKeywordChanged (filter) {
    this.setState({ filter })
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

  onSearchKeyUp (e) {
    clearTimeout(this.searchTimer)
    const value = e.target.value
    this.searchTimer = setTimeout(() => {
      emit(EVENTS.CREDENTIALS_KEYWORD_CHANGED, value) // eslint-disable-line no-undef
    }, 200)
  }

  render () {
    return (
      <TabPage>
        <TabPageHeader title="Settings">
          <div className="text-center margin-md-top">
            <div className="pull-right">
              <RaisedButton label="Add" onTouchTap={this.onAddCred.bind(this)}/>&nbsp;
              <RaisedButton label="Edit" onTouchTap={this.onEditCred.bind(this)}/>&nbsp;
              <RaisedButton label="Remove" onTouchTap={this.onRemoveCred.bind(this)}/>&nbsp;
            </div>

            <div className="inline-block">
              <TextField
                hintText="Search"
                errorStyle={errorStyle}
                inputStyle={inputStyle}
                underlineFocusStyle={underlineStyle}
                onKeyUp={this.onSearchKeyUp.bind(this)}
              />
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={6}>
          {this.renderContent()}
          {this.renderCredentialsModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}
