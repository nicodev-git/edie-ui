import React from 'react'

import AppletCard from 'components/common/AppletCard'
import { extImageBaseUrl, appletColors as colors } from 'shared/Global'

export default class RectItem extends React.Component {
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
