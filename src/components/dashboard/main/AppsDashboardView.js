import React from 'react'
import {IconButton, TextField} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Create'

import EditConfigModal from './apps/EditConfigModal'
import AppletCard from 'components/common/AppletCard'
import { appletColors as colors } from 'shared/Global'
import AppDevicesModal from './apps/AppDevicesModal'


import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

export default class AppsDashboardView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filter: ''
    }
  }
  componentWillMount () {
    this.props.fetchAllApps(false)
  }

  getServers () {
    const {filter} = this.state
    const list = this.props.allApps || []
    const s = filter.toLowerCase()
    if (!s) return list
    return list.filter(p => p.Name.toLowerCase().indexOf(s) >= 0)
  }

  onClickPref () {
    this.props.showAppsPrefModal(true)
  }

  onSavePref (values) {
    this.props.updateAppsPref(values)
    this.props.showAppsPrefModal(false)

    this.props.fetchAllApps(!!values.hideDuplicate)
  }

  onClosePrefModal () {
    this.props.showAppsPrefModal(false)
  }

  onChangeFilter (e, value) {
    this.setState({
      filter: value
    })
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  onClickApp (app) {
    let deviceIds = app['DeviceIds']
    const list = this.props.allApps || []
    if (!deviceIds) {
      deviceIds = list.filter(p => p.Name === app.Name).map(p => p.DeviceId)
    }

    this.props.showAppDevicesModal(true, deviceIds, app)
  }

  getAppDevices () {
    const {appDeviceIds, devices} = this.props
    return devices.filter(p => appDeviceIds.includes(p.id))
  }
  onCloseAppDevicesModal () {
    this.props.showAppDevicesModal(false)
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  renderServer (item, index) {
    return (
      <AppletCard
        key={item.ID}
        color={colors[index % colors.length]}
        name={item.Publisher}
        desc={item.Name}
        desc2={item.Version}
        desc3=""
        onClick={this.onClickApp.bind(this, item)}
      />
    )
  }

  renderAddMenu () {
    return (
      <div>
        <TextField name="filter" value={this.state.filter} onChange={this.onChangeFilter.bind(this)}
                   label="Search"
                   className="valign-top"/>
        <IconButton onClick={this.onClickPref.bind(this)}><EditIcon /></IconButton>
      </div>
    )
  }

  renderPrefModal () {
    if (!this.props.appsPrefModalOpen) return null
    return (
      <EditConfigModal
        {...this.props}
        onClickSave={this.onSavePref.bind(this)}
        onClickClose={this.onClosePrefModal.bind(this)}
      />
    )
  }

  renderDevicesModal () {
    if (!this.props.appDevicesModalOpen) return null
    return (
      <AppDevicesModal
        onHide={this.onCloseAppDevicesModal.bind(this)}
        devices={this.getAppDevices()}
        selectedApp={this.props.selectedApp}
      />
    )
  }

  render () {
    return (
      <TabPage>
        <TabPageHeader title="Apps">
          <div className="margin-md-top">
            {this.renderAddMenu()}
          </div>
        </TabPageHeader>

        <TabPageBody history={this.props.history} location={this.props.location}>
          <ul className="web-applet-cards">
            {this.getServers().map(this.renderServer.bind(this))}
          </ul>

          {this.renderPrefModal()}
          {this.renderDevicesModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}
