import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Create'
import ListIcon from '@material-ui/icons/List'
import {IconButton, Chip} from '@material-ui/core'
import {Field} from 'redux-form'

import CredentialModal from 'components/credentials/CredentialModal'
import CredListPicker from 'containers/settings/credentials/CredsPickerContainer'

import {showConfirm} from 'components/common/Alert'
import {getDeviceCredentials} from 'shared/Global'
import { chipStyles } from 'style/common/materialStyles'
import { FormToggle } from 'components/modal/parts'

const iconStyle = {
  padding: 0,
  width: 24,
  height: 24
}

export default class Credentials extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pickerOpen: false,
      selectedCred: null
    }
  }
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

  //////////////////////////////////////////////////////////

  onClickChange (cred) {
    this.setState({
      pickerOpen: true,
      selectedCred: cred
    })
  }

  onCloseExistingPicker (cred) {
    const { onReplaceCreds } = this.props
    const { selectedCred } = this.state

    this.setState({
      pickerOpen: false
    })

    if (!cred) return null

    cred && onReplaceCreds && onReplaceCreds(selectedCred, cred)
  }

  //////////////////////////////////////////////////////////

  renderExistingPicker () {
    if (!this.state.pickerOpen) return null
    return (
      <CredListPicker
        onClose={this.onCloseExistingPicker.bind(this)}
      />
    )
  }

  renderPicker () {
    if (!this.props.deviceCredsPickerVisible) return null

    return (
      <CredentialModal
        credentials={this.props.credentials}
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
    const { selectedDeviceCreds, selectDeviceCreds, onClickEditCreds, onChangeIntegrated, isWin } = this.props

    return (
      <div>
        <div className={isWin ? '' : 'hidden'}>
          <Field
            name="useIntegratedSecurity" component={FormToggle} type="checkbox" label="Integrated Security"
            onChange={onChangeIntegrated}/>
        </div>
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
                      <Chip style={chipStyles.chip} label={`${p.type} Default`}/>
                    </div>
                  ) : null}
                </td>
                <td>
                  <IconButton style={iconStyle}
                    className={onClickEditCreds ? '' : 'hidden'}
                    onClick={this.onClickEdit.bind(this, p)}>
                    <EditIcon nativeColor="#545454"/>
                  </IconButton>
                  <IconButton style={iconStyle}
                    onClick={this.onClickRemove.bind(this, p)}>
                    <DeleteIcon nativeColor="#545454"/>
                  </IconButton>
                  <IconButton style={iconStyle} onClick={this.onClickChange.bind(this, p)}>
                    <ListIcon nativeColor="#545454"/>
                  </IconButton>
                </td>
              </tr>
            )}
            </tbody>
          </table>
          {this.renderPicker()}
          {this.renderExistingPicker()}
        </div>
      </div>
    )
  }
}
