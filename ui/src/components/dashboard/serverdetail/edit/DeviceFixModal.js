import React from 'react'
import { reduxForm } from 'redux-form'

import DeviceFixModalView from './DeviceFixModalView'
class DeviceFixModal extends React.Component {
  componentWillMount () {
    this.props.fetchCredentials()
    this.props.fetchCredTypes()
  }

  getMessage () {
    const {fixCode} = this.props
    let msg = ''
    switch (fixCode) {
      case 1:
        msg = 'No Agent/Collector defined. If you need agent, click "Install" button to install agent. Otherwise, please choose collector.'
        break
      case 2:
        msg = 'No login credentials found. Please add SSH credentials.'
        break
      case 3:
        msg = 'Please choose linux os name.'
        break
      case 4:
        msg = 'Failed to check device with current credentials. Please check if credentials are correct.'
        break
      default:
        msg = ''
        break
    }

    return msg
  }

  onHide () {
    this.props.showDeviceFixModal(false)
  }

  onClickAddCreds () {
    this.props.showDeviceCredsPicker(true)
  }

  handleFormSubmit (values) {
  }

  ///////////////////////////////////////////////////////////////////////////////

  render () {
    const { handleSubmit } = this.props

    return (
      <DeviceFixModalView
        {...this.props}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        msg={this.getMessage()}
        onHide={this.onHide.bind(this)}
        onClickAddCreds={this.onClickAddCreds.bind(this)}
      />
    )
  }
}

export default reduxForm({
  form: 'editDeviceFixForm'
})(DeviceFixModal)
