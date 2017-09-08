import React from 'react'

import AppletCard from 'components/common/AppletCard'
import { extImageBaseUrl, appletColors as colors } from 'shared/Global'

export default class SysDashboardView extends React.Component {
  getServers () {
    const {devices, allDevices} = this.props
    return (devices || allDevices).filter(p => (p.tags || []).includes('Server'))
  }

  renderServer (server, i) {
    const {onClickMenuItem} = this.props
    return (
      <AppletCard
        key={server.id}
        color={colors[i % colors.length]}
        name={server.templateName}
        desc={server.name}
        img={`${extImageBaseUrl}${server.image}`}
        onClick={() => onClickMenuItem(server)}
      />
    )
  }

  render () {
    return (
      <div>
        <ul className="web-applet-cards">
          {this.getServers().map(this.renderServer.bind(this))}
        </ul>
      </div>
    )
  }
}
