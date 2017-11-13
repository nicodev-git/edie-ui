import React from 'react'
import {IconButton, IconMenu, MenuItem} from 'material-ui'
import EditIcon from 'material-ui/svg-icons/content/create'

import { wizardConfig, getDeviceType } from 'components/common/wizard/WizardConfig'
import ServerItem from './ServerItem'

import { showAlert, showConfirm } from 'components/common/Alert'

export default class AppsDashboardView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      deviceWizardConfig: {},
      deviceWizardVisible: false,
    }
  }

  getServers () {
    return []
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

  render () {
    return (
      <div>
        {this.renderAddMenu()}
        <ul className="web-applet-cards">
          {this.getServers().map(this.renderServer.bind(this))}
        </ul>
      </div>
    )
  }
}
