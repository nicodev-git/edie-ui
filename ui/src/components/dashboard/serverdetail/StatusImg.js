import React from 'react'

export default class StatusImg extends React.Component {
  render () {
    const {device, onClickFix} = this.props
    if (!device) return null
    const up = device.agent && (new Date().getTime() - device.agent.lastSeen) < 3 * 60 * 1000
    if (up) return null
    return (
      <span className="valign-middle margin-md-left">
        <img
          src="/resources/images/dashboard/bell.png"
          alt=""
          width={24}
          className="valign-middle margin-sm-right"
          style={{marginTop: -3}}/>
        No Agent/Collector not defined
        <span className="link margin-md-left text-primary" onClick={onClickFix}>Fix</span>
      </span>
    )
  }
}
