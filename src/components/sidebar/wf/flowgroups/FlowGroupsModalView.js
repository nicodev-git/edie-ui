import React, {Component} from 'react'

import {Button} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'

import {
  FormInput,
  SubmitBlock,
  Modal,
  CardPanel
} from 'components/modal/parts'
import EditIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";

export default class FlowGroupsModalView extends Component {


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

  render () {
    const {onClickClose} = this.props
    return (
      <Modal title="Groups" onRequestClose={onClickClose}>
          <CardPanel title="Groups">
            {this.renderGroups()}
          </CardPanel>
      </Modal>
    )
  }
}
