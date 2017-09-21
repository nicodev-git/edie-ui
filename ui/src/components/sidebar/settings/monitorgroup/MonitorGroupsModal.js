import React from 'react'

import MonitorGroupsModalView from './MonitorGroupsModalView'

export default class MonitorGroupsModal extends React.Component {
  onHide () {
    this.props.showMonitorGroupsModal(false)
  }
  render () {
    return (
      <MonitorGroupsModalView
        monitorGroups={this.props.monitorGroups}
        onHide={this.onHide.bind(this)}
      />
    )
  }
}
