import React from 'react'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import EditIcon from 'material-ui/svg-icons/content/create'
import {IconButton, Chip} from 'material-ui'

import CredentialModal from 'components/credentials/CredentialModal'
import {showConfirm} from 'components/common/Alert'
import {getDeviceCredentials} from 'shared/Global'
import { chipStyles } from 'style/common/materialStyles'

export default class Credentials extends React.Component {
  componentDidMount () {
    this.props.selectDeviceCreds(-1)
  }
  onClickEdit (selected) {
    this.props.onClickEditCreds(selected)
  }
  onClickRemove (selected) {
    showConfirm('Are you sure?', btn => {
      if (btn !== 'ok') return
      this.props.removeCredentials(selected)
    })

  }
  onAddCredential (props) {
    if (props) {
      const {selectedDevice} = this.props
      this.props.addCredentials({
        ...props,
        global: false,
        deviceIds: [selectedDevice.id]
      })
    }
    this.props.showDeviceCredsPicker(false)
  }
  onUpdateCredential (props) {
    this.props.updateCredentials(props)
    this.props.showDeviceCredsPicker(false)
  }
  onCloseCredPicker () {
    this.props.showDeviceCredsPicker(false)
  }
  renderPicker () {
    if (!this.props.deviceCredsPickerVisible) return null

    return (
      <CredentialModal
        addCredentials={this.onAddCredential.bind(this)}
        updateCredentials={this.onUpdateCredential.bind(this)}
        credentialTypes={this.props.credentialTypes}
        onClose={this.onCloseCredPicker.bind(this)}/>
    )
  }
  getDeviceCreds () {
    const { selectedDevice, credentials, showGlobal } = this.props
    return getDeviceCredentials(selectedDevice, credentials, showGlobal)
  }
  render () {
    const { selectedDeviceCreds, selectDeviceCreds, onClickEditCreds } = this.props

    return (
      <div style={{minHeight: 150}}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Type</th>
              <th>User</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
          {this.getDeviceCreds().map((p, i) =>
            <tr
              key={i}
              className={selectedDeviceCreds === i ? 'selected' : ''}
              onClick={() => selectDeviceCreds(i)}>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.type}</td>
              <td>{p.username}</td>
              <td>
                {p.global && p.default ? (
                  <div style={chipStyles.wrapper}>
                    <Chip style={chipStyles.chip}>{p.type}&nbsp;Default</Chip>
                  </div>
                ) : null}
              </td>
              <td>
                <IconButton style={{padding: 0, width: 24, height: 24}}
                  className={onClickEditCreds ? '' : 'hidden'}
                  onTouchTap={this.onClickEdit.bind(this, p)}>
                  <EditIcon color="#545454" hoverColor="#f44336" />
                </IconButton>
                <IconButton style={{padding: 0, width: 24, height: 24}}
                  onTouchTap={this.onClickRemove.bind(this, p)}>
                  <DeleteIcon color="#545454" hoverColor="#f44336"/>
                </IconButton>
              </td>
            </tr>
          )}
          </tbody>
        </table>
        {this.renderPicker()}
      </div>
    )
  }
}
