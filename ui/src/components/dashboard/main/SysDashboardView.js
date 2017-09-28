import React from 'react'
import {IconButton, IconMenu, MenuItem} from 'material-ui'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'

import { wizardConfig, getDeviceType } from 'components/common/wizard/WizardConfig'
import DeviceWizardContainer from 'containers/shared/wizard/DeviceWizardContainer'
import ServerItem from './ServerItem'
import RefreshOverlay from 'components/common/RefreshOverlay'

import { showAlert, showConfirm } from 'components/common/Alert'

export default class SysDashboardView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      deviceWizardConfig: {},
      deviceWizardVisible: false,
    }
  }

  getServers () {
    const {devices, allDevices} = this.props
    return (devices || allDevices).filter(p => (p.tags || []).includes('Server'))
  }

  onClickServer (server) {
    this.props.history.push(`/serverdetail/${server.id}`)
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
    console.log(params)
    this.props.addDevice(params, url)
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

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
      <div className="text-right" style={{position: 'absolute', top: -45, right: 0}}>
        <IconMenu
          iconButtonElement={<IconButton><AddCircleIcon /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          {tpls.map(p =>
            <MenuItem key={p.id} primaryText={p.name} onTouchTap={this.onClickAddItem.bind(this, p)}/>
          )}
        </IconMenu>
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
        {deleteDeviceState && <RefreshOverlay />}
      </div>
    )
  }
}
