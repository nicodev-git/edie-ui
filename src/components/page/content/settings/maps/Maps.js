import React from 'react'
import {RaisedButton} from 'material-ui'

import InfiniteTable from 'components/shared/InfiniteTable'
import { appendComponent, removeComponent } from '../../../../../util/Component'
import { showAlert, showConfirm } from '../../../../shared/Alert'

import MapModal from './MapModal'
import MapRestoreModal from './MapRestoreModal'
import MapUsersModal from './MapUsersModal'

import SettingTabs from '../SettingTabs'
import TabPage from 'components/shared/TabPage'
import TabPageBody from 'components/shared/TabPageBody'
import TabPageHeader from 'components/shared/TabPageHeader'

export default class Maps extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }

    this.cells = [{
      'displayName': 'Name',
      'columnName': 'name'
    }]
  }

  componentWillMount () {
    this.props.fetchSettingMaps()
  }

  renderContent () {
    return (
      <InfiniteTable
        cells={this.cells}
        ref="maps"
        rowMetadata={{'key': 'id'}}
        selectable
        onRowDblClick={this.onMapEdit.bind(this)}

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

  onMapAdded (modal, success) {
    removeComponent(modal)
    if (success) {
      this.refs.maps.refresh()
    }
  }

  onMapEdit () {
    const selected = this.getMaps().getSelected()
    if (!selected) return showAlert('Please select map.')

    this.props.openSettingMapModal(selected)
  }

  onMapDelete () {
    const selected = this.getMaps().getSelected()
    if (!selected) return showAlert('Please select map.')

    showConfirm(`Click OK to remove the selected item.\nName: ${
             selected.name}`, (btn) => {
      if (btn !== 'ok') return

      this.props.deleteSettingMap(selected)
    })
  }

  onMapRestore () {
    appendComponent(
      <MapRestoreModal onClose={removeComponent}/>
    )
  }

  onMapUsers () {
    const selected = this.getMaps().getSelected()
    if (!selected) return showAlert('Please select map.')

    this.props.openMapUsersModal(selected)
  }

  render () {
    return (
      <TabPage>
        <TabPageHeader title="Settings">
          <div className="text-center margin-md-top">
            <div style={{position: 'absolute', right: '25px'}}>
              <RaisedButton label="Add Map" onTouchTap={this.onMapAdd.bind(this)}/>&nbsp;
              <RaisedButton label="Edit Map" onTouchTap={this.onMapEdit.bind(this)}/>&nbsp;
              <RaisedButton label="Delete Map" onTouchTap={this.onMapDelete.bind(this)}/>&nbsp;
              <RaisedButton label="Edit Map Users" onTouchTap={this.onMapUsers.bind(this)}/>&nbsp;
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={3} tclass="small-table">
          {this.renderContent()}
          {this.renderMapModal()}
          {this.renderMapUsersModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}
