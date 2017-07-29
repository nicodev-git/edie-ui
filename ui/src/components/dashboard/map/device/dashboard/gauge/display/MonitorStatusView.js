import React from 'react'
import moment from 'moment'

const iconStyle = {
  fontSize: '70px'
}

const containerStyle = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)'
}

const labelStyle = {
  fontSize: '20px'
}

export default class MonitorStatusView extends React.Component {
  render () {
    const {monitor} = this.props
    const isUp = monitor.status === 'UP'
    const imgName = `/resources/images/dashboard/map/triangle-${isUp ? 'up' : 'down'}.png`
    return (
      <div className="text-center" style={containerStyle}>
        <div className={`nowrap ${isUp ? 'text-success' : 'text-danger'}`} style={iconStyle}>
          <img src={imgName} width="60" alt="" className="valign-top" style={{marginTop: 20}}/>
          <span className="margin-md-left">{isUp ? 'Up' : 'Down'}</span>
        </div>
        {
          isUp ? (
            <div style={labelStyle}>Last down {moment(monitor.lastfalure).fromNow()}</div>
          ) : (
            <div style={labelStyle}>Last up {moment(monitor.lastsuccess).fromNow()}</div>
          )
        }
      </div>
    )
  }
}
