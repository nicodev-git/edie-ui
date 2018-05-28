import React from 'react'
import {IconButton} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import CreateIcon from '@material-ui/icons/Create'

import { Modal, CardPanel } from 'components/modal/parts'

export default class MonitorGroupsModalView extends React.Component {
  renderTools () {
    const {onClickAdd} = this.props
    return (
      <div>
        <IconButton onClick={onClickAdd}>
          <AddCircleIcon/>
        </IconButton>
      </div>
    )
  }

  renderRow (monitorGroup) {
    const {onClickEdit, onClickRemove} = this.props
    return (
      <tr key={monitorGroup.id}>
        <td>{monitorGroup.name || 'No Name'}</td>
        <td className="text-right">
          <IconButton onClick={() => onClickEdit(monitorGroup)}>
            <CreateIcon/>
          </IconButton>
          <IconButton onClick={() => onClickRemove(monitorGroup)}>
            <DeleteIcon/>
          </IconButton>
        </td>
      </tr>
    )
  }

  render () {
    const {onHide, monitorGroups, editModal} = this.props
    return (
      <Modal title="Monitor Groups" onRequestClose={onHide}>
        <CardPanel title="Monitor Groups" tools={this.renderTools()}>
          <div style={{maxHeight: 350, overflow: 'auto'}}>
            <table className="table table-hover">
              <tbody>
              {monitorGroups.map(p => this.renderRow(p))}
              </tbody>
            </table>
          </div>
        </CardPanel>
        {editModal}
      </Modal>
    )
  }
}
