import React from 'react'
import {Button} from '@material-ui/core'

import InfiniteTable from 'components/common/InfiniteTable'
import { showAlert, showConfirm } from 'components/common/Alert'

import CredentialTypeModal from './CredentialTypeModal'

import SettingTabs from '../SettingTabs'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import UserTabs from '../users/UserTabs'
import {hasPermission} from 'shared/Permission'

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

  renderTypeModal () {
    if (!this.props.credTypeModalOpen) return null
    return (
      <CredentialTypeModal {...this.props}/>
    )
  }

  getTable () {
    return this.refs.table
  }

  onAddCred () {
    this.props.showCredTypeModal(true)
  }

  onRemoveCred () {
    let selected = this.getTable().getSelected()
    if (!selected) return showAlert('Please choose credentials.')

    showConfirm('Are you sure? Click OK to remove.', (btn) => {
      if (btn !== 'ok') return

      this.props.removeCredType(selected)
    })
  }
  render () {
    const {userInfo} = this.props
    const canEdit = hasPermission(userInfo, 'EditSettings')
    return (
      <TabPage>
        <TabPageHeader title="Credential Types">
          <div className="text-center margin-md-top">
            <div className="pull-right">
              {canEdit && <Button variant="raised" onClick={this.onAddCred.bind(this)}>Add</Button>}&nbsp;
              {canEdit && <Button variant="raised" onClick={this.onRemoveCred.bind(this)}>Remove</Button>}&nbsp;
              <UserTabs history={this.props.history}/>&nbsp;
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={3} history={this.props.history} location={this.props.location}>
          {this.renderContent()}
          {this.renderTypeModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}
