import React from 'react'

import {TextField, RaisedButton} from 'material-ui'
import {Modal, CardPanel} from 'components/modal/parts'

export default class WfRectGroupsModalView extends React.Component {
  render () {
    const {onHide, wfRectGroups, name, onChangeName, onClickAdd} = this.props
    return (
      <Modal title="Groups" onRequestClose={onHide}>
        <CardPanel title="Add Group">
          <TextField name="name" hintText="Name" value={name} onChange={onChangeName}/>
          <RaisedButton label="Add" className="margin-lg-left" onClick={onClickAdd}/>
        </CardPanel>

        <CardPanel title="Edit Grups">
          <div style={{maxHeight: 300, overflow: 'auto'}}>
            <table className="table">
              <tbody>
              {wfRectGroups.map(p =>
                <tr key={p.id}>
                  <td>{p.name}</td>
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
