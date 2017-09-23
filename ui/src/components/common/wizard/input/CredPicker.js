import React from 'react'
import { IconButton, Chip } from 'material-ui'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import ListIcon from 'material-ui/svg-icons/action/list'

import { CardPanel } from 'components/modal/parts'
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

  onClickDelete (index) {
    this.props.onClickDelete(index)
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
        <IconButton onTouchTap={this.onClickAdd.bind(this)} tooltip="Add Credentials">
          <AddCircleIcon size={32}/>
        </IconButton>
      </div>
    )
  }
  render () {
    const credentials = this.getCredentials()
    return (
      <CardPanel title="Credentials" tools={this.renderButtons()}>
        <div style={{minHeight: 200, maxHeight: 300, overflow: 'auto'}}>
          <table className="table table-hover">
            <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
              <th>User</th>
              <th />
              <th />
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
                      <Chip style={chipStyles.chip}>{p.type}&nbsp;Default</Chip>
                    </div>
                  ) : 'Global') : null}
                </td>
                <th>
                  {!p.id ? (
                    <CloseIcon className="link" onTouchTap={this.onClickDelete.bind(this, i)}/>
                  ) : (
                    <div>
                      <IconButton tooltip="Choose other credential">
                        <ListIcon className="link" onTouchTap={this.onClickChangeGlobal.bind(this, p)}/>
                      </IconButton>
                      <IconButton tooltip="Add">
                        <AddCircleIcon/>
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
