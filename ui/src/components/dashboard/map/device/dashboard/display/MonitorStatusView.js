import React from 'react'

export default class MonitorStatusView extends React.Component {
  render () {
    const {monitor} = this.props
    return (
      <div>
        {monitor.name}: {monitor.status}
      </div>
    )
  }
}
