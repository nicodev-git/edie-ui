import React from 'react'
import {RaisedButton} from 'material-ui'
import CredPicker from 'containers/settings/credentials/CredsPickerContainer'

export default class Credentials extends React.Component {
  onClickAdd () {
  }
  onClickRemove () {
  }
  onCloseCredPicker () {
  }
  renderPicker () {
    if (!this.props.credPickerVisible) return null
    return (
      <CredPicker onClose={this.onCloseCredPicker.bind(this)}/>
    )
  }
  render () {
    const {deviceCreds} = this.props
    return (
      <div>
        <div className="padding-md-top">
          <RaisedButton label="Add" onTouchTap={this.onClickAdd.bind(this)}/>&nbsp;
          <RaisedButton label="Remove" onTouchTap={this.onClickRemove.bind(this)}/>
        </div>
        <div>
          <table className="table table-hover">
            <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>User</th>
            </tr>
            </thead>
            <tbody>
            {deviceCreds.map((p, i) =>
              <tr key={i}>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.username}</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
