import React from 'react'
import {IconButton, IconMenu, MenuItem} from 'material-ui'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'

import AppletCard from 'components/common/AppletCard'
import { extImageBaseUrl, appletColors as colors } from 'shared/Global'

export default class SysDashboardView extends React.Component {
  getServers () {
    const {devices, allDevices} = this.props
    return (devices || allDevices).filter(p => (p.tags || []).includes('Server'))
  }

  onClickServer (server) {
    this.props.history.push(`/serverdetail/${server.id}`)
  }

  getServerTpls () {
    const {deviceTemplates} = this.props
    return deviceTemplates.filter(p => (p.tags || []).includes('Server'))
  }

  onClickAddItem (tpl) {
    console.log(tpl)
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  renderServer (server, i) {
    return (
      <AppletCard
        key={server.id}
        color={colors[i % colors.length]}
        name={server.templateName}
        desc={server.name}
        img={`${extImageBaseUrl}${server.image}`}
        onClick={() => this.onClickServer(server)}
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
