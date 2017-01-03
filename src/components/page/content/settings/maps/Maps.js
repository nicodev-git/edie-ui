import React from 'react'
import {
    ButtonGroup,
    Button
} from 'react-bootstrap'

import InfiniteTable from '../../../../shared/InfiniteTable'
const ResponsiveInfiniteTable = InfiniteTable
import { appendComponent, removeComponent } from '../../../../../util/Component'
import { showAlert, showConfirm } from '../../../../shared/Alert'

import MapModalContainer from '../../../../../containers/page/content/settings/maps/MapModalContainer'
import MapRestoreModal from './MapRestoreModal'
import MapUsersModalContainer from '../../../../../containers/page/content/settings/maps/MapUsersModalContainer'

import SettingTabs from '../SettingTabs'
import TabPage from '../../../../shared/TabPage'
import TabPageBody from '../../../../shared/TabPageBody'
import TabPageHeader from '../../../../shared/TabPageHeader'

export default class Maps extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }

    this.cells = [/* {
            "displayName": "ID",
            "columnName": "id",
            "cssClassName": "width-120",
      }, */{
        'displayName': 'Name',
        'columnName': 'name'
      }/*, {
            "displayName": "Users",
            "columnName": "users",
            "customComponent": (props) => {
                const val = props.data
                return (
                    <div>
                        {val.join(', ')}
                    </div>
                )
            }
    } */]

        // this.listeners = {
        //     [EVENTS.MAPS_ADD_CLICKED]: this.onMapAdd.bind(this),
        //     [EVENTS.MAPS_EDIT_CLICKED]: this.onMapEdit.bind(this),
        //     [EVENTS.MAPS_DELETE_CLICKED]: this.onMapDelete.bind(this),
        //
        //     [EVENTS.MAPS_RESTORE_CLICKED]: this.onMapRestore.bind(this),
        //     [EVENTS.MAPS_USERS_CLICKED]: this.onMapUsers.bind(this),
        // }
  }

  componentWillMount () {
    this.props.fetchSettingMaps()
  }

  renderContent () {
    return (
      <ResponsiveInfiniteTable
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

  renderContent2 () {
    return (
      <InfiniteTable
        url="/dashboard/getMaps"
        params={{}}
        cells={this.cells}
        rowMetadata={{'key': 'id'}}
        selectable
        ref="maps"

        onRowDblClick={this.onMapEdit.bind(this)}
      />
    )
  }

  renderMapModal () {
    if (!this.props.mapModalVisible) return
    return (
      <MapModalContainer />
    )
  }

  renderMapUsersModal () {
    if (!this.props.mapUsersModalVisible) return
    return (
      <MapUsersModalContainer />
    )
  }

  getMaps () {
    return this.refs.maps.refs.wrappedInstance
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
    // let table // Never used
    // const {tabIndex} = this.state // Never used
    return (
      <TabPage>
        <TabPageHeader title="Settings">
          <div className="text-center margin-md-top">
            <div style={{position: 'absolute', right: '25px'}}>
              <ButtonGroup>
                <Button onClick={this.onMapAdd.bind(this)}>Add Map</Button>
                <Button onClick={this.onMapEdit.bind(this)}>Edit Map</Button>
                <Button onClick={this.onMapDelete.bind(this)}>Delete Map</Button>
                <Button onClick={this.onMapUsers.bind(this)}>Edit Map Users</Button>
              </ButtonGroup>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={3}>
          {this.renderContent()}
          {this.renderMapModal()}
          {this.renderMapUsersModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}
