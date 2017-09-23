import React from 'react'
import {SelectField, MenuItem} from 'material-ui'

import {TwoButtonsBlockCustom, Modal, CardPanel} from 'components/modal/parts'

export default class CredPickerView extends React.Component {
  renderLeftTools () {
    const {credentialTypes, type, onChangeType} = this.props
    return (
      <div>
        <SelectField onChange={onChangeType} value={type}>
          {credentialTypes.map(p =>
            <MenuItem primaryText={p.name} value={p.name}/>
          )}
        </SelectField>
      </div>
    )
  }

  render () {
    const {credentials, onHide, onClickOK, onSelect, selectedCreds} = this.props
    return (
      <Modal title="Credentials" onRequestClose={onHide}>
        <CardPanel title="Credentials" leftTools={this.renderLeftTools()}>
          <div style={{height: 300, overflow: 'auto'}}>
            <table className="table table-hover">
              <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Type</th>
                <th>User</th>
              </tr>
              </thead>
              <tbody>
              {credentials.map((p, i) =>
                <tr
                  key={i}
                  onClick={() => onSelect(p)}
                  className={selectedCreds && selectedCreds.id === p.id ? 'selected' : ''}
                >
                  <td>{p.name}</td>
                  <td>{p.description}</td>
                  <td>{p.type}</td>
                  <td>{p.username}</td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </CardPanel>
        <TwoButtonsBlockCustom name1="OK" name2="Cancel" action1={onClickOK} action2={onHide}/>
      </Modal>
    )
  }
}
