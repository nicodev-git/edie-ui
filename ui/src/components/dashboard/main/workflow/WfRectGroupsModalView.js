import React from 'react'

import {TextField, RaisedButton} from 'material-ui'
import {Modal, CardPanel} from 'components/modal/parts'

export default class WfRectGroupsModalView extends React.Component {
  render () {
    const {onHide, wfRectGroups, name, onChangeName} = this.props
    return (
      <Modal title="Groups" onRequestClose={onHide}>
        <CardPanel title="Groups">
          <TextField name="name" hintText="Name" value={name} onChange={onChangeName}/>
          <RaisedButton label="Add" className="margin-lg-left"/>

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
