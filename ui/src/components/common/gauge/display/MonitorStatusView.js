import React from 'react'
import moment from 'moment'

const iconStyle = {
  fontSize: '70px'
}

const smallIconStyle = {
  fontSize: '20px'
}

const containerStyle = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%'
}

const labelStyle = {
  fontSize: '20px'
}

const smallLabelStyle = {
  fontSize: '12px'
}

export default class MonitorStatusView extends React.Component {
  render () {
    const {isUp, lastUpdate, hideLabel, title, size} = this.props
    const imgName = `/resources/images/dashboard/map/triangle-${isUp ? 'up' : 'down'}.png`
    const isSmall = size === 'small'
    return (
      <div className="text-center" style={containerStyle}>
        <div className={`text-ellipsis ${isUp ? 'text-success' : 'text-danger'}`} style={isSmall ? smallIconStyle : iconStyle}>
          <img src={imgName} width={isSmall ? 20 : 60} alt="" className="valign-top" style={{marginTop: isSmall ? 5 : 20}}/>
          <span className="margin-md-left">{title || (isUp ? 'Up' : 'Down')}</span>
        </div>
        {!hideLabel && <div style={isSmall ? smallLabelStyle : labelStyle}>Last {isUp ? 'down' : 'up'} {lastUpdate ? moment(lastUpdate).fromNow() : 'never'}</div>}
      </div>
    )
  }
}
