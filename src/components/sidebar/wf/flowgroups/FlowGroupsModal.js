import React, {Component} from 'react'
import {Button} from '@material-ui/core'

import FlowGroupModal from './FlowGroupModal'
import FlowGroupsModalView from './FlowGroupsModalView'

export default class FlowGroupsModal extends Component {

  componentWillMount () {
    this.props.fetchGroups()
  }

  onClickAdd () {
    this.props.showGroupModal(true)
  }

  onClickEdit (group) {
    this.props.showGroupModal(true, group)
  }

  onClickDelete (group) {
    if (!window.confirm('Click OK to remove. Workflows will be changed to default group.')) return null
    this.props.removeGroup(group)
  }

  onSaveGroup (values) {
    const {editGroup, groups} = this.props
    const entity = {
      ...editGroup,
      ...values
    }
    if (editGroup) {
      this.props.updateGroup(entity)
    } else {
      const found = groups.filter(p => p.name.toLowerCase() === entity.name.toLowerCase())
      if (found.length) return alert('Group with the same name exists.')
      this.props.addGroup(entity)
    }
    this.onCloseGroupModal()
  }

  onCloseGroupModal () {
    this.props.showGroupModal(false)
  }
  renderGroupModal () {
    if (!this.props.groupModalOpen) return

    return (
      <FlowGroupModal
        onSave={this.onSaveGroup.bind(this)}
        onClose={this.onCloseGroupModal.bind(this)}
      />
    )
  }

  onHide () {
    this.props.onClose()
  }

  render () {
    return (
      <FlowGroupsModalView
        groups={this.props.groups}
        onClickClose={this.onHide.bind(this)}
        onClickEdit={this.onClickEdit.bind(this)}
        onClickDelete={this.onClickDelete.bind(this)}
      >
        {this.renderGroupModal()}
      </FlowGroupsModalView>
    )
  }
}
