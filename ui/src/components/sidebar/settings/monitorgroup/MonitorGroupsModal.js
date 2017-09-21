import React from 'react'

import MonitorGroupsModalView from './MonitorGroupsModalView'

export default class MonitorGroupsModal extends React.Component {
  onHide () {
    this.props.showMonitorGroupsModal(false)
  }
  onClickAdd () {

  }
  onClickEdit () {

  }
  onClickRemove () {

  }
  render () {
    return (
      <MonitorGroupsModalView
        monitorGroups={this.props.monitorGroups}
        onHide={this.onHide.bind(this)}
        onClickAdd={this.onClickAdd.bind(this)}
        onClickEdit={this.onClickEdit.bind(this)}
        onClickRemove={this.onClickRemove.bind(this)}
      />
    )
  }
}
