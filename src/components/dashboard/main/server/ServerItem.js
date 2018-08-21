import React from 'react'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'

import AppletCard from 'components/common/AppletCard'
import { extImageBaseUrl, appletColors as colors, trimOSName, checkAgentUp } from 'shared/Global'
import {getAgentStatus} from 'util/Device'

export default class ServerItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      up: false,
      info: 'Collector not working'
    }
  }

  componentWillMount () {
    const {noCred} = this.props
    if (noCred) return
    const up = getAgentStatus(this.props.server)
    this.setState({ up })

    const device = this.props.server
    checkAgentUp(device.id, (up, info, resCode) => {
      const time = device.lastSeen || (device.agent || {}).lastSeen
      let msg = ''
      if (time) msg = `Ping is ok (last ${moment(time).fromNow()} ago) credential problem`
      else msg = 'Connection problem'
      this.setState({
        up,
        info: up ? '' : (info || msg)
      })
      setTimeout(ReactTooltip.rebuild, 100)
    })
  }

  renderRightIcons () {
    const {noCred} = this.props
    if (noCred) return null
    const {up} = this.state
    if (up) return null

    return (
      <img
        src="/resources/images/dashboard/bell.png"
        alt=""
        width={20}
        className="valign-middle"
        title={this.state.info}
        data-tip={this.state.info}
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
        desc2={<span>{trimOSName(server.osDetails)}<br/>{server.wanip || ''}</span>}
        desc3={server.hostname || 'Unknown'}
        img={`${extImageBaseUrl}${server.image}`}
        onClick={onClick}
        onClickDelete={onClickDelete}
        rightIcons={this.renderRightIcons()}
        titleLimit={15}
      />
    )
  }
}
