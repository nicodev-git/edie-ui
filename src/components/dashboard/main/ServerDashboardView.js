import React from 'react'
import {IconButton, Card, Select, MenuItem} from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import ClearIcon from '@material-ui/icons/ClearAll'
import ComputerIcon from '@material-ui/icons/Computer'
import DevicesIcon from '@material-ui/icons/Devices'
import {purple, deepPurple} from '@material-ui/core/colors'
import ReactTooltip from 'react-tooltip'

import { wizardConfig } from 'components/common/wizard/WizardConfig'
import DeviceWizardContainer from 'containers/shared/wizard/DeviceWizardContainer'
import ServerItem from './server/ServerItem'
import RefreshOverlay from 'components/common/RefreshOverlay'

import { showAlert, showConfirm } from 'components/common/Alert'
import ServerSearchModal from './server/ServerSearchModal'
import ServerCmdModal from './server/ServerCmdModal'
import FloatingMenu from 'components/common/floating/FloatingMenu'
import RangeAddModal from './server/RangeAddModal'
import AppliancesView from './server/AppliancesView'

const inputStyle = {
  'verticalAlign': 'middle',
  'border': 'none',
  'display': 'inline-block',
  'height': '34px',
  'marginLeft': '16px',
  'fontSize': '16px',
  'width': 510
}

const btnStyle = {
  padding: '10px 0',
  width: 40
}

const tplColors = [purple[500], deepPurple['A400']]

const menuItems = ['Servers', 'Workstations', 'Appliances']

export default class ServerDashboardView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      deviceWizardConfig: {},
      deviceWizardVisible: false,

      filter: '',

      page: 'Servers'
    }
  }

  componentWillMount () {
    this.props.updateServerSearchResults(null)
  }

  getServers () {
    const {filter} = this.state
    const {devices, allDevices, serverSearchResults} = this.props
    let list = (devices || allDevices).filter(p => (p.tags || []).includes('Server'))

    if (serverSearchResults) {
      list = list.filter(p => serverSearchResults.includes(p.id))
    }
    if (filter) {
      list = list.filter(p => p.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
    }

    return list
  }

  onClickServer (server) {
    this.props.history.push(`/dashboard/servers/${server.slug}/detail`)
  }

  onClickDeleteServer (server) {
    showConfirm('Click OK to delete.', (btn) => {
      if (btn !== 'ok') return

      this.props.deleteMapDevice(server)
    })
  }

  getServerTpls () {
    const {deviceTemplates} = this.props
    return deviceTemplates.filter(p => (p.tags || []).includes('Server'))
  }

  onClickAddItem (tpl) {
    // console.log(tpl)
    //
    // const options = {
    //   title: tpl.name,
    //   type: getDeviceType(tpl.name),
    //   imgName: tpl.image,
    //   imageUrl: `/externalpictures?name=${tpl.image}`,
    //   x: 0,
    //   y: 0,
    //   width: 50,
    //   height: 50,
    //
    //   tpl,
    //   monitors: tpl.monitors,
    //   templateName: tpl.name,
    //   workflowids: tpl.workflowids || []
    // }
    //
    // this.showAddWizard(options, (id, name, data) => {
    //
    // }, () => {
    //
    // })
    this.props.history.push(`/addserver?from=servers`)
  }

  onClickAddRange () {
    // this.props.showRangeAddModal(true)
    this.props.history.push('/dashboard/servers/addrange')
  }

  onCloseAddRange () {
    this.props.showRangeAddModal(false)
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  showAddWizard (options, callback, closeCallback) {
    if (wizardConfig[options.type] === null) {
      showAlert(`Unrecognized Type: ${options.type}`) // eslint-disable-line no-undef
      return
    }

    this.setState({
      deviceWizardConfig: {
        options, callback, closeCallback
      },
      deviceWizardVisible: true
    })
  }

  onFinishAddWizard (callback, res, params, url) {
    // console.log(params)
    // this.props.addDevice(params, url)
    this.props.updateMapDevice(params)
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  onClickSearch () {
    this.props.showServerSearchModal(true)
  }

  onCloseSearchModal () {
    this.props.showServerSearchModal(false)
  }

  onSubmitSearch (params) {
    this.props.searchServers(params)
    this.props.updateServerSearchParams(params)
    this.props.showServerSearchModal(false)
  }

  onClearSearch () {
    this.props.updateServerSearchParams({})
    this.props.updateServerSearchResults(null)
    this.props.showServerSearchModal(false)
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  onClickCommand () {
    this.props.showServerCmdModal(true)
  }

  onCloseCmdModal () {
    this.props.showServerCmdModal(false)
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  onChangePage (e) {
    this.setState({
      page: e.target.value
    })
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  renderRangeAddModal () {
    if (!this.props.rangeAddModalOpen) return null
    return (
      <RangeAddModal
        onHide={this.onCloseAddRange.bind(this)}
        scanRange={this.props.scanRange}
      />
    )
  }

  renderCmdModal () {
    if (!this.props.serverCmdModalOpen) return null
    return (
      <ServerCmdModal
        onHide={this.onCloseCmdModal.bind(this)}
        devices={this.getServers()}
      />
    )
  }

  renderSearchModal () {
    if (!this.props.serverSearchModalOpen) return null
    return (
      <ServerSearchModal
        serverSearchParams={this.props.serverSearchParams}
        onSubmit={this.onSubmitSearch.bind(this)}
        onHide={this.onCloseSearchModal.bind(this)}
        onClickClear={this.onClearSearch.bind(this)}
      />
    )
  }

  renderServer (server, i) {
    return (
      <ServerItem
        key={server.id}
        server={server}
        index={i}
        onClick={() => this.onClickServer(server)}
        onClickDelete={() => this.onClickDeleteServer(server)}
      />
    )
  }

  renderAddMenu () {
    const {page, filter} = this.state
    return (
      <div className="text-center margin-sm-top margin-sm-bottom" style={{minHeight: 40}}>
        <div style={{position: 'absolute', left: 27, top: 8}}>
          <Select
            value={page} onChange={this.onChangePage.bind(this)}
            className="valign-top text-left"
            style={{width: 180}}>
            {menuItems.map(p =>
              <MenuItem key={p} value={p}>{p}</MenuItem>
            )}
          </Select>
        </div>
        {page === 'Servers' ? (
          <div className="inline-block">
            <Card>
              <input type="text" style={inputStyle} value={filter} onChange={e => this.setState({filter: e.target.value})}/>
              <IconButton onClick={this.onClickSearch.bind(this)} style={btnStyle}><SettingsIcon/></IconButton>
              <IconButton onClick={this.onClearSearch.bind(this)} style={btnStyle}><ClearIcon/></IconButton>
              <IconButton onClick={this.onClickCommand.bind(this)} style={btnStyle}
                          className="margin-md-right"><ComputerIcon/></IconButton>
            </Card>
          </div>
        ) : null}
      </div>
    )
  }
  getMenuItems () {
    // const tpls = this.getServerTpls()

    // const items = tpls.map((p, i) => ({
    //   label: p.name,
    //   icon: <ComputerIcon/>,
    //   color: tplColors[i % tplColors.length],
    //   onClick: this.onClickAddItem.bind(this, p)
    // }))

    const items = [{
      label: 'Add Server',
      icon: <ComputerIcon/>,
      color: tplColors[0],
      onClick: this.onClickAddItem.bind(this)
    }]

    items.push({
      label: 'Add Range',
      icon: <DevicesIcon/>,
      color: deepPurple['A400'],
      onClick: this.onClickAddRange.bind(this)
    })

    return items
  }

  renderDeviceWizard () {
    if (!this.state.deviceWizardVisible) return null

    const {options, callback, closeCallback} = this.state.deviceWizardConfig

    let extra = {
      mapid: null,
      x: options.x,
      y: options.y,
      width: options.width,
      height: options.height,
      image: options.imgName,
      templateName: options.templateName,
      workflowids: options.workflowids,
      tags: options.tpl.tags || []
    }

    const config = {
      mapid: null
    }

    return (
      <DeviceWizardContainer
        deviceType={options.type}
        onClose={() => {
          this.setState({deviceWizardVisible: false})
          closeCallback && closeCallback()
        }}
        title={options.title}
        monitors={options.monitors}
        extraParams={extra}
        configParams={config}
        onFinish={this.onFinishAddWizard.bind(this, callback)}
        addDevice={this.props.addDevice}
        removeDevice={this.props.deleteMapDevice}
      />
    )
  }

  renderServers () {
    return (
      <div>
        <div style={{paddingLeft: 20}}>
          <ul className="web-applet-cards">
            {this.getServers().map(this.renderServer.bind(this))}
          </ul>
        </div>

        <FloatingMenu menuItems={this.getMenuItems()}/>
        {this.renderDeviceWizard()}
        {this.renderRangeAddModal()}
      </div>
    )
  }

  renderAppliances () {
    return (
      <AppliancesView {...this.props}/>
    )
  }

  renderContent () {
    switch(this.state.page) {
      case 'Workstations': return null
      case 'Appliances': return this.renderAppliances()
      default: return this.renderServers()
    }
  }

  render () {
    const {deleteDeviceState} = this.props
    return (
      <div>
        {this.renderAddMenu()}
        {this.renderContent()}

        {deleteDeviceState && <RefreshOverlay />}
        {this.renderSearchModal()}
        {this.renderCmdModal()}
        <ReactTooltip />
      </div>
    )
  }
}
