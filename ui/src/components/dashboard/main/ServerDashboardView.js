import React from 'react'
import {IconButton, IconMenu, MenuItem, Card} from 'material-ui'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import ClearIcon from 'material-ui/svg-icons/communication/clear-all'

import { wizardConfig, getDeviceType } from 'components/common/wizard/WizardConfig'
import DeviceWizardContainer from 'containers/shared/wizard/DeviceWizardContainer'
import ServerItem from './ServerItem'
import RefreshOverlay from 'components/common/RefreshOverlay'

import { showAlert, showConfirm } from 'components/common/Alert'
import ServerSearchModal from './server/ServerSearchModal'

const inputStyle = {
  'verticalAlign': 'middle',
  'border': 'none',
  'display': 'inline-block',
  'height': '34px',
  'marginTop': '-18px',
  'marginLeft': '16px',
  'fontSize': '16px',
  'width': 510
}

const btnStyle = {
  padding: '10px 0',
  width: 40
}

export default class ServerDashboardView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      deviceWizardConfig: {},
      deviceWizardVisible: false,
    }
  }

  componentWillMount () {
    this.props.updateServerSearchResults(null)
  }

  getServers () {
    const {devices, allDevices, serverSearchResults} = this.props
    let list = (devices || allDevices).filter(p => (p.tags || []).includes('Server'))

    if (serverSearchResults) {
      list = list.filter(p => serverSearchResults.includes(p.id))
    }

    return list
  }

  onClickServer (server) {
    this.props.history.push(`/dashboard/serverdetail/${server.id}`)
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
    console.log(tpl)

    const options = {
      title: tpl.name,
      type: getDeviceType(tpl.name),
      imgName: tpl.image,
      imageUrl: `/externalpictures?name=${tpl.image}`,
      x: 0,
      y: 0,
      width: 50,
      height: 50,

      tpl,
      monitors: tpl.monitors,
      templateName: tpl.name,
      workflowids: tpl.workflowids || []
    }

    this.showAddWizard(options, (id, name, data) => {

    }, () => {

    })
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

  renderSearchModal () {
    if (!this.props.serverSearchModalOpen) return null
    return (
      <ServerSearchModal
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
    const tpls = this.getServerTpls()
    return (
      <div className="text-center" style={{position: 'absolute', top: -68, width: '100%'}}>
        <div className="inline-block">
          <Card>
            <input type="text" style={inputStyle}/>
            <IconButton onTouchTap={this.onClickSearch.bind(this)} style={btnStyle}><SettingsIcon/></IconButton>
            <IconButton onTouchTap={this.onClearSearch.bind(this)} style={btnStyle} className="margin-md-right"><ClearIcon/></IconButton>
            <IconMenu
              className="hidden"
              iconButtonElement={<IconButton><AddCircleIcon /></IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              {tpls.map(p =>
                <MenuItem key={p.id} primaryText={p.name} onTouchTap={this.onClickAddItem.bind(this, p)}/>
              )}
            </IconMenu>
          </Card>
        </div>

      </div>
    )
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
  render () {
    const {deleteDeviceState} = this.props
    return (
      <div>
        {this.renderAddMenu()}
        <ul className="web-applet-cards">
          {this.getServers().map(this.renderServer.bind(this))}
        </ul>
        {this.renderDeviceWizard()}
        {this.renderSearchModal()}
        {deleteDeviceState && <RefreshOverlay />}
      </div>
    )
  }
}
