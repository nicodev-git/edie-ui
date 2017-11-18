import React from 'react'

import AppletCard from 'components/common/AppletCard'
import { extImageBaseUrl, appletColors as colors } from 'shared/Global'

export default class ServerItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      up: false
    }
  }

  getStatus () {
    const {lastSeen, agentType, agent} = this.props.server
    if (agentType) {
      const now = new Date().getTime()
      if (agentType === 'agent') {
        if (agent && (now - agent.lastSeen) < 3 * 60 * 1000) return true
      } else if (agentType === 'collector') {
        if ((now - lastSeen) < 3 * 60 * 1000) return true
      }
    }
    return false
  }

  componentWillMount () {
    this.setState({
      up: this.getStatus()
    })
  }

  renderRightIcons () {
    const {up} = this.state
    if (up) return null

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
        desc2={<span>{server.osDetails}<br/>{server.wanip || ''}</span>}
        desc3={server.hostname || 'Unknown'}
        img={`${extImageBaseUrl}${server.image}`}
        onClick={onClick}
        onClickDelete={onClickDelete}
        rightIcons={this.renderRightIcons()}
      />
    )
  }
}
