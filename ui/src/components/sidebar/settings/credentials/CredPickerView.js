import React from 'react'
import {Dialog, FlatButton, Chip} from 'material-ui'

import {TwoButtonsBlockCustom} from 'components/modal/parts'

import {chipStyles} from 'style/common/materialStyles'

export default class CredPickerView extends React.Component {
  render () {
    const {credentials, onHide} = this.props
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
              <tr key={i}>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.username}</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </Dialog>
    )
  }s
}
