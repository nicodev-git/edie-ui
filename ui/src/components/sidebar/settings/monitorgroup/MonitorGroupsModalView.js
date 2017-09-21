import React from 'react'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import CreateIcon from 'material-ui/svg-icons/content/create'

import { Modal, CardPanel } from 'components/modal/parts'

export default class MonitorGroupsModalView extends React.Component {
  renderTools () {
    const {onClickAdd} = this.props
    return (
      <div>
        <IconButton onTouchTap={onClickAdd}>
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
          <IconButton onTouchTap={() => onClickEdit(monitorGroup)}>
            <CreateIcon/>
          </IconButton>
          <IconButton onTouchTap={() => onClickRemove(monitorGroup)}>
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
