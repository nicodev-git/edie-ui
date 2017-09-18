import React from 'react'

import AppletCard from 'components/common/AppletCard'
import { extImageBaseUrl, appletColors as colors } from 'shared/Global'

export default class ServerItem extends React.Component {
  renderRightIcons () {
    const {lastSeen, agentType, agent} = this.props.server
    if (!agentType) return null
    const now = new Date().getTime()
    if (agentType === 'agent') {
      if (agent && (now - agent.lastSeen) < 3 * 60 * 1000) return null
    } else if (agentType === 'collector') {
      if ((now - lastSeen) < 3 * 60 * 1000) return null
    }
    return (
      <img
        src="/resources/images/dashboard/bell.png"
        alt=""
        width={20}
        className="valign-middle"
      />
    )
  }

  render () {
    const {server, index, onClick, onClickDelete} = this.props
    return (
      <AppletCard
        key={server.id}
        color={colors[index % colors.length]}
        name={server.templateName || 'Unknown'}
        desc={server.name}
        desc2={server.wanip || server.lanip || ''}
        desc3={server.hostname || (server.agent ? server.agent.host : '') || 'Unknown'}
        img={`${extImageBaseUrl}${server.image}`}
        onClick={onClick}
        onClickDelete={onClickDelete}
        rightIcons={this.renderRightIcons()}
      />
    )
  }
}
