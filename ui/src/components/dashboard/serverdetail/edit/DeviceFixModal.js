import React from 'react'
import { reduxForm } from 'redux-form'

import DeviceFixModalView from './DeviceFixModalView'
import {showAlert} from 'components/common/Alert'

class DeviceFixModal extends React.Component {
  componentWillMount () {
    this.props.fetchCredentials()
    this.props.fetchCredTypes()
    this.props.fetchCollectors()
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

  getConfig () {
    const {fixCode} = this.props
    const config = {
      agentPick: false,
      credentials: false
    }
    if (fixCode === 1) {
      config.agentPick = true
      config.credentials = true
    }
    return config
  }

  onHide () {
    const {onClose} = this.props
    this.props.showDeviceFixModal(false)
    onClose && onClose()
  }

  onClickAddCreds () {
    this.props.showDeviceCredsPicker(true)
  }

  handleFormSubmit (values) {
    console.log(values)
    if (values.agentType === 'collector') {
      if (!values.collectorId)
      showAlert('Please select collector.')
      return
    }
  }

  ///////////////////////////////////////////////////////////////////////////////

  render () {
    const { handleSubmit } = this.props

    return (
      <DeviceFixModalView
        {...this.props}
        config={this.getConfig()}
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
