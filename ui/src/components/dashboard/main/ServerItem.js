import React from 'react'

import AppletCard from 'components/common/AppletCard'
import { extImageBaseUrl, appletColors as colors, checkAgentUp } from 'shared/Global'

export default class ServerItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      up: true
    }
  }
  componentWillMount () {
    checkAgentUp(this.props.server.id, up => {
      this.setState({up})
    })
  }

  renderRightIcons () {
    return null
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
