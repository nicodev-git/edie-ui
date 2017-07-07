import React from 'react'
import {Dialog} from 'material-ui'

import {TwoButtonsBlockCustom} from 'components/modal/parts'

export default class CredPickerView extends React.Component {
  render () {
    const {credentials, onHide, onClickOK, onSelect, selectedCreds} = this.props
    return (
      <Dialog open title="Credentials" onRequestClose={onHide}>
        <div style={{height: 300, overflow: 'auto'}}>
          <table className="table table-hover">
            <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
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
                <td>{p.username}</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
        <TwoButtonsBlockCustom name1="OK" name2="Cancel" action1={onClickOK} action2={onHide}/>
      </Dialog>
    )
  }
}
