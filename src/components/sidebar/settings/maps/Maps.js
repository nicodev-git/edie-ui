import React from 'react'
import {Button} from '@material-ui/core'

import InfiniteTable from 'components/common/InfiniteTable'
import { showAlert, showConfirm } from 'components/common/Alert'

import MapModal from './MapModal'
import MapUsersModal from './MapUsersModal'

import SettingTabs from '../SettingTabs'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'
import {hasPermission} from 'shared/Permission'
import { reduxForm } from 'redux-form'

class Maps extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.showForm = false
    this.cells = [{
      'displayName': 'Name',
      'columnName': 'name'
    }, {
      'displayName': 'Description',
      'columnName': 'description'
    }, {
      'displayName': 'Group',
      'columnName': 'mapgroup'
    }, {
      'displayName': 'Users',
      'columnName': 'users',
      'customComponent': p => {
        return <span>{(p.data || []).join(', ')}</span>
      }
    }]
  }

  componentWillMount () {
    this.props.fetchSettingMaps()
  }

  handleFormSubmit (values) {
    this.props.addSettingMap({...values })
    this.props.reset()
    this.showForm = false
  }
  showMapForm () {
    this.showForm = true
    this.props.addSettingMap(null)
  }
  renderContent (canEdit) {
    const { handleSubmit } = this.props
    return (
      <InfiniteTable
        cells={this.cells}
        newMap={this.newMap}
        ref="maps"
        rowMetadata={{'key': 'id'}}
        selectable
        showForm={this.showForm}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onRowDblClick={canEdit ? this.onMapEdit.bind(this) : null}
        useExternal={false}
        data={this.props.maps}
      />
    )
  }

  renderMapModal () {
    if (!this.props.mapModalVisible) return
    return (
      <MapModal {...this.props}/>
    )
  }

  renderMapUsersModal () {
    if (!this.props.mapUsersModalVisible) return
    return (
      <MapUsersModal {...this.props} />
    )
  }

  getMaps () {
    return this.refs.maps
  }

  onMapAdd () {
    this.props.openSettingMapModal()
  }

  onMapEdit () {
    const selected = this.getMaps().getSelected()
    if (!selected) return showAlert('Please select map.')

    this.props.openSettingMapModal(selected)
  }

  onMapDelete () {
    const selected = this.getMaps().getSelected()
    if (!selected) return showAlert('Please select map.')

    showConfirm(`Are you sure that you want to delete map '${selected.name}'?`, (btn) => {
      if (btn !== 'ok') return

      this.props.deleteSettingMap(selected)
    })
  }

  onMapUsers () {
    const selected = this.getMaps().getSelected()
    if (!selected) return showAlert('Please select map.')

    this.props.openMapUsersModal(selected)
  }

  render () {
    const {userInfo} = this.props
    const canSetting = hasPermission(userInfo, 'EditSettings')
    const canAdd = canSetting && hasPermission(userInfo, 'AddMap')
    const canEdit = canSetting && hasPermission(userInfo, 'EditMap')

    return (
      <TabPage>
        <TabPageHeader title="Settings">
          <div className="text-center margin-md-top">
            <div style={{position: 'absolute', right: '25px'}}>
              <Button variant="raised" onClick={this.showMapForm.bind(this)} className={canAdd ? '' : 'hidden'}>Add Map</Button>&nbsp;
              <Button variant="raised" onClick={this.onMapEdit.bind(this)} className={canEdit ? '' : 'hidden'}>Edit Map</Button>&nbsp;
              <Button variant="raised" onClick={this.onMapDelete.bind(this)} className={canEdit ? '' : 'hidden'}>Delete Map</Button>&nbsp;
              <Button variant="raised" onClick={this.onMapUsers.bind(this)} className="hidden">Edit Map Users</Button>&nbsp;
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody 
          tabs={SettingTabs} 
          tab={2} 
          tclass="small-table" 
          history={this.props.history} 
          location={this.props.location} 
          transparent>
          {this.renderContent(canEdit)}
          {this.renderMapModal()}
          {this.renderMapUsersModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}

export default reduxForm({
  form: 'mapsForm'
})(Maps)