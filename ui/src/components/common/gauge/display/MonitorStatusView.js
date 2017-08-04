import React from 'react'
import moment from 'moment'

const iconStyle = {
  fontSize: '70px'
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

export default class MonitorStatusView extends React.Component {
  render () {
    const {isUp, lastUpdate, hideLabel, title} = this.props
    const imgName = `/resources/images/dashboard/map/triangle-${isUp ? 'up' : 'down'}.png`
    return (
      <div className="text-center" style={containerStyle}>
        {title && <div>{title}</div>}
        <div className={`nowrap ${isUp ? 'text-success' : 'text-danger'}`} style={iconStyle}>
          <img src={imgName} width="60" alt="" className="valign-top" style={{marginTop: 20}}/>
          <span className="margin-md-left">{isUp ? 'Up' : 'Down'}</span>
        </div>
        {!hideLabel && <div style={labelStyle}>Last {isUp ? 'down' : 'up'} {lastUpdate ? moment(lastUpdate).fromNow() : 'never'}</div>}
      </div>
    )
  }
}
