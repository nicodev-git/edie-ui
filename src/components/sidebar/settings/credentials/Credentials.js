import React from 'react'
import {Button, Chip} from '@material-ui/core'
import {findIndex} from 'lodash'

import InfiniteTable from 'components/common/InfiniteTable'
import { showAlert, showConfirm } from 'components/common/Alert'

import CredentialModal from './CredentialModal'

import SettingTabs from '../SettingTabs'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import UserTabs from '../users/UserTabs'
import { chipStyles } from 'style/common/materialStyles'
import {hasPermission} from 'shared/Permission'

export default class Credentials extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
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
    }, {
      'displayName': 'Type',
      'columnName': 'type'
    }, {
      'displayName': 'Global',
      'columnName': 'global',
      'customComponent': p => {
        return <span>{p.data ? 'Yes' : 'No'}</span>
      }
    }, {
      'displayName': 'Device',
      'columnName': 'deviceIds',
      'customComponent': p => {
        const {devices} = this.props
        const deviceNames = []
        const data = p.data || []
        data.forEach(id => {
          const index = findIndex(devices, {id})
          if (index >= 0) deviceNames.push(devices[index].name)
        })
        return <span>{deviceNames.join(',')}</span>
      }
    }, {
      'displayName': '',
      'columnName': 'default',
      'customComponent': p => {
        if (!p.data) return <span/>
        return (
          <div style={chipStyles.wrapper}>
            <Chip style={chipStyles.chip} label={<span>{p.rowData.type}&nbsp;Default</span>}/>
          </div>
        )
      }
    }]
  }

  componentWillMount () {
    this.props.fetchCredentials()
    this.props.fetchCredTypes()
    this.props.fetchDevicesGroups()
  }

  renderContent (canEdit) {
    return (
      <InfiniteTable
        cells={this.cells}
        ref="credentials"
        rowMetadata={{'key': 'id'}}
        selectable
        onRowDblClick={canEdit ? this.onEditCred.bind(this) : null}

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


    const {devices} = this.props
    const deviceNames = []
    const data = selected.deviceIds || []
    data.forEach(id => {
      const index = findIndex(devices, {id})
      if (index >= 0) deviceNames.push(devices[index].name)
    })
    const affected = deviceNames.join(',')
    const affectedMsg = affected ? `Affected: ${affected}` : ''
    const msg = (
      <div>
        Are you sure? Click OK to remove. <br/>
        {affectedMsg}
      </div>
    )
    showConfirm(msg, (btn) => {
      if (btn !== 'ok') return

      this.props.removeCredentials(selected)
    })
  }
  onSetDefault () {
    let selected = this.getTable().getSelected()
    if (!selected) return showAlert('Please choose credentials.')
    if (!selected.global) return showAlert('Only global credentials can be set as default.')
    this.props.updateCredentials({
      ...selected,
      default: true
    })
  }
  render () {
    const {userInfo} = this.props
    const canEdit = hasPermission(userInfo, 'EditSettings')
    return (
      <TabPage>
        <TabPageHeader title="Credentials">
          <div className="text-center margin-md-top">
            <div className="pull-right">
              {canEdit ? (
                <div className="inline-block">
                  <Button variant="raised" onClick={this.onAddCred.bind(this)}>Add</Button>&nbsp;
                  <Button variant="raised" onClick={this.onEditCred.bind(this)}>Edit</Button>&nbsp;
                  <Button variant="raised" onClick={this.onRemoveCred.bind(this)}>Remove</Button>&nbsp;
                  <Button variant="raised" onClick={this.onSetDefault.bind(this)}>Set Default</Button>&nbsp;
                </div>
              ) : null}
              <UserTabs history={this.props.history}/>&nbsp;
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={3} history={this.props.history} location={this.props.location} transparent>
          {this.renderContent(canEdit)}
          {this.renderCredentialsModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}
