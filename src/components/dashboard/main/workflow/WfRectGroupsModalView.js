import React from 'react'
import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'

import {TextField, Button} from '@material-ui/core'
import {Modal, CardPanel} from 'components/modal/parts'

export default class WfRectGroupsModalView extends React.Component {
  render () {
    const {onHide, wfRectGroups, name, onChangeName, onClickAdd, onClickEdit, onClickDelete} = this.props
    return (
      <Modal title="Groups" onRequestClose={onHide}>
        <CardPanel title="Add Group">
          <TextField name="name" label="Name" value={name} onChange={onChangeName}/>
          <Button variant="raised" className="margin-lg-left" onClick={onClickAdd}>Add</Button>
        </CardPanel>

        <CardPanel title="Edit Groups">
          <div style={{maxHeight: 300, overflow: 'auto'}}>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {wfRectGroups.map(p =>
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>
                    <CreateIcon className="link" onClick={() => onClickEdit(p)}/>
                    <DeleteIcon className="link" onClick={() => onClickDelete(p)}/>
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </CardPanel>
      </Modal>
    )
  }
}
