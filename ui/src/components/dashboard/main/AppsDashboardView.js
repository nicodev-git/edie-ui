import React from 'react'
import {IconButton} from 'material-ui'
import EditIcon from 'material-ui/svg-icons/content/create'

import ServerItem from './ServerItem'

export default class AppsDashboardView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  getServers () {
    return []
  }

  getServerTpls () {
    const {deviceTemplates} = this.props
    return deviceTemplates.filter(p => (p.tags || []).includes('Server'))
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
    return (
      <div className="text-right" style={{position: 'absolute', top: -45, right: 0}}>
        <IconButton><EditIcon /></IconButton>
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
