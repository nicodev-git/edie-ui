import React from 'react'
import { IconButton, Chip } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import CloseIcon from '@material-ui/icons/Close'
import ListIcon from '@material-ui/icons/List'
import { Field } from 'redux-form'

import { CardPanel, FormToggle } from 'components/modal/parts'
import {mergeCredentials} from 'shared/Global'
import { chipStyles } from 'style/common/materialStyles'
import {showAlert} from 'components/common/Alert'

import CredListPicker from 'containers/settings/credentials/CredsPickerContainer'

export default class CredPicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedGlobal: null
    }
  }
  componentWillMount () {
    this.props.fetchCredTypes()
  }

  onClickAdd () {
    this.props.showDeviceCredsPicker(1)
  }

  onClickAddByType (cred) {
    this.props.showDeviceCredsPicker(1, null, cred.type)
  }

  onClickDelete (index, cred) {
    this.props.onClickDelete(index, cred)
  }

  getCredentials() {
    const {credentials, extraParams, deviceGlobalCredentials, deviceCredentials} = this.props
    return mergeCredentials({
      templateName: extraParams.templateName
    }, credentials, deviceGlobalCredentials, deviceCredentials)
  }

  onClickChangeGlobal (cred) {
    this.setState({
      selectedGlobal: cred
    })
    this.props.showCredListModal(true)
  }

  onClosePicker (selected) {
    if (selected) {
      console.log(selected)
      if (selected.type !== this.state.selectedGlobal.type || !selected.global) {
        showAlert('Please choose global credential of same type.')
        return
      }
      this.props.onChangeGlobalCredential(selected, this.state.selectedGlobal)
    }
    this.props.showCredListModal(false)
  }

  onChangeIntegrated (e, checked) {
    const {onChangeIntegratedSecurity} = this.props
    onChangeIntegratedSecurity && onChangeIntegratedSecurity(checked)
  }

  renderPicker () {
    if (!this.props.credListModalOpen) return null
    return (
      <CredListPicker
        global
        onClose={this.onClosePicker.bind(this)}
      />
    )
  }

  renderButtons () {
    return (
      <div>
        <IconButton onClick={this.onClickAdd.bind(this)} tooltip="Add Credentials">
          <AddCircleIcon size={32}/>
        </IconButton>
      </div>
    )
  }
  render () {
    const {isWin} = this.props
    const credentials = this.getCredentials()
    return (
      <CardPanel title="Credentials" tools={this.renderButtons()}>
        <div className={isWin ? '' : 'hidden'}>
          <Field
            name="useIntegratedSecurity" component={FormToggle} type="checkbox" label="Integrated Security"
            onChange={this.onChangeIntegrated.bind(this)}/>
        </div>

        <div style={{minHeight: 200, maxHeight: 300, overflow: 'auto'}}>
          <table className="table table-hover">
            <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
              <th>User</th>
              <th />
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {credentials.map((p, i) =>
              <tr key={i}>
                <td>{p.name}</td>
                <td>{p.type}</td>
                <td>{p.description}</td>
                <td>{p.username}</td>
                <td>
                  {p.global ? (p.default ? (
                    <div style={chipStyles.wrapper}>
                      <Chip style={chipStyles.smallChip} label={`${p.type}Default`}/>
                    </div>
                  ) : 'Global') : null}
                </td>
                <th>
                  {!p.global ? (
                    <CloseIcon className="link" onClick={this.onClickDelete.bind(this, i, p)}/>
                  ) : (
                    <div>
                      <IconButton tooltip="Choose other credential" style={{width: 24, padding: 0}}>
                        <ListIcon className="link" onClick={this.onClickChangeGlobal.bind(this, p)}/>
                      </IconButton>
                      <IconButton tooltip="Add" style={{width: 24, padding: 0}}>
                        <AddCircleIcon onClick={this.onClickAddByType.bind(this, p)}/>
                      </IconButton>
                    </div>
                  )}
                </th>
              </tr>
            )}
            </tbody>
          </table>
        </div>
        {this.renderPicker()}
      </CardPanel>
    )
  }
}
