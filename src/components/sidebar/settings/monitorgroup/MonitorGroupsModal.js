import React from 'react'

import MonitorGroupsModalView from './MonitorGroupsModalView'
import MonitorGroupModal from './MonitorGroupModal'
import {showConfirm} from 'components/common/Alert'

export default class MonitorGroupsModal extends React.Component {
  onHide () {
    this.props.showMonitorGroupsModal(false)
  }
  onClickAdd () {
    this.props.showMonitorGroupModal(true)
  }
  onClickEdit (entity) {
    this.props.showMonitorGroupModal(true, entity)
  }
  onClickRemove (entity) {
    showConfirm('Are you sure?', btn => {
      if (btn !== 'ok') return

      this.props.removeMonitorGroup(entity)
    })
  }

  renderEditModal () {
    if (!this.props.monitorGroupModalOpen) return null
    return (
      <MonitorGroupModal {...this.props}/>
    )
  }

  render () {
    return (
      <MonitorGroupsModalView
        monitorGroups={this.props.monitorGroups}
        onHide={this.onHide.bind(this)}
        onClickAdd={this.onClickAdd.bind(this)}
        onClickEdit={this.onClickEdit.bind(this)}
        onClickRemove={this.onClickRemove.bind(this)}
        editModal={this.renderEditModal()}
      />
    )
  }
}
