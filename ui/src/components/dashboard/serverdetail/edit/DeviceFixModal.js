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
      agentPick: fixCode === 1,
      credentials: fixCode === 1 || fixCode === 4
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
    const {editDevice} = this.props
    const config = this.getConfig()

    console.log(values)

    if (config.agentPick && !values.agentType) {
      showAlert('Please choose agent or collector.')
      return
    }

    if (values.agentType === 'collector') {
      if (!values.collectorId) {
        showAlert('Please select collector.')
        return
      }
    }

    if (config.agentPick) {
      const props = {
        ...editDevice,
        ...values
      }
      this.props.updateMapDevice(props)
    }
    this.onHide()
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
