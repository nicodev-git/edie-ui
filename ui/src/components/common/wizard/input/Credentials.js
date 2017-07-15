import React from 'react'
import {RaisedButton} from 'material-ui'
import CredentialModal from './CredentialModal'

import { TwoButtonsBlockCustom } from 'components/modal/parts'

export default class Credentials extends React.Component {
  componentDidMount () {
    this.props.selectDeviceCreds(-1)
  }
  onClickAdd () {
    this.props.showDeviceCredsPicker(true)
  }
  onClickRemove () {
    // const {deviceCreds, selectedDeviceCreds} = this.props
    // this.props.updateDeviceCreds(deviceCreds.filter((p, i) => i !== selectedDeviceCreds))
  }
  onCloseCredPicker (props) {
    if (props) {
      const {selectedDevice} = this.props
      this.props.addCredentials({
        ...props,
        deviceIds: [selectedDevice.id]
      })
    }
    this.props.showDeviceCredsPicker(false)
  }
  renderPicker () {
    if (!this.props.deviceCredsPickerVisible) return null

    return (
      <CredentialModal
        addCredentials={this.onCloseCredPicker.bind(this)}
        credentialTypes={[]}
        onClose={this.onCloseCredPicker.bind(this)}/>
    )
  }
  render () {
    const { selectedDevice, credentials, selectedDeviceCreds, selectDeviceCreds } = this.props
    const deviceCreds = credentials.filter(p => !p.global && p.deviceIds && p.deviceIds.indexOf(selectedDevice.id) >= 0)

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
                <th>Type</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
            {deviceCreds.map((p, i) =>
              <tr
                key={i}
                className={selectedDeviceCreds === i ? 'selected' : ''}
                onClick={() => selectDeviceCreds(i)}>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.type}</td>
                <td>{p.username}</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
        {this.renderPicker()}
      </div>
    )
  }
}
