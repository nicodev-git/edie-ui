import React, {Component} from 'react'

import AddIcon from '@material-ui/icons/AddCircle'
import EditIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'

import {
  FormInput,
  SubmitBlock,
  Modal,
  CardPanel
} from 'components/modal/parts'

export default class FlowGroupsModalView extends Component {
  renderGroups () {
    const {groups, onClickEdit, onClickDelete} = this.props
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
                <EditIcon className="link margin-md-right" onClick={() => onClickEdit(m)}/>
                <DeleteIcon className="link margin-md-right" onClick={() => onClickDelete(m)}/>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    )
  }

  render () {
    const {onClickClose, onClickAdd} = this.props
    return (
      <Modal title="Groups" onRequestClose={onClickClose}>
          <CardPanel title="Groups" tools={<AddIcon className="link" onClick={onClickAdd}/>}>
            {this.renderGroups()}
          </CardPanel>
          {this.props.children}
      </Modal>
    )
  }
}
