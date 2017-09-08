import React from 'react'

export default class SysDashboardView extends React.Component {
  getServers () {
    const {devices, allDevices} = this.props
    return (devices || allDevices).filter(p => {
      if (p.tags.includes(['Server'])) {

      }
    })
  }

  render () {
    return (
      <div>
        Servers
      </div>
    )
  }
}
