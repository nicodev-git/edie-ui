import React from 'react'
import {Button} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import FlowGroupModal from './FlowGroupModal'

export default class FlowGroups extends React.Component {
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

  renderGroups () {
    const {groups} = this.props
    return (
      <div className="flex-1" style={{overflow: 'auto', padding: 10}}>
        <table className="table table-hover">
          <thead>
          <tr>
            <th>Name</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {groups.map(m =>
            <tr key={m.id}>
              <td>
                {m.name}
              </td>
              <td className="text-right padding-lg-right">
                <EditIcon className="link margin-md-right" onClick={this.onClickEdit.bind(this, m)}/>
                <DeleteIcon className="link margin-md-right" onClick={this.onClickDelete.bind(this, m)}/>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    )
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

  render () {
    return (
      <TabPage>
        <TabPageHeader title="Groups">
          <div className="text-center margin-md-top">
            <div className="pull-right">
              <Button variant="raised" onClick={this.onClickAdd.bind(this)}>Add</Button>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody history={this.props.history} location={this.props.location}>
          {this.renderGroups()}
          {this.renderGroupModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}
