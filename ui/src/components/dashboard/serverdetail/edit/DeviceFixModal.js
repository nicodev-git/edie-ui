import React from 'react'
import { reduxForm } from 'redux-form'
import {CircularProgress} from 'material-ui'

import DeviceFixModalView from './DeviceFixModalView'
import {showAlert} from 'components/common/Alert'
import {getDeviceCredentials} from 'shared/Global'

class DeviceFixModal extends React.Component {
  componentWillMount () {
    this.props.fetchCredentials()
    this.props.fetchCredTypes()
    this.props.fetchCollectors()
  }

  getStatusMessage (code) {
    let msg = ''
    switch (code) {
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

  getMessage () {
    const {fixCode, fixResult, fixStatus} = this.props
    let msg = ''
    let code = fixCode
    if (fixStatus === 'checking' ) {
      msg = <div style={{color: '#600000'}}>Trying to access server, please wait…<CircularProgress className="valign-top margin-md-left" size={24}/></div>
    } else {
      if (fixStatus === 'done') {
        code = fixResult.code
        if (!code) msg = <div style={{color: '#008000'}}>It's Fixed, you can close this windows now</div>
      }
      if (code) msg = <div style={{color: '#600000'}}>{this.getStatusMessage(code)}</div>
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

  onChangeAgentType (e, value) {
    const {editDevice, formValues} = this.props

    const entity = {
      ...editDevice,
      agentType: value
    }

    if (value === 'collector') {
      if (formValues.collectorId)
        entity.collectorId = formValues.collectorId
      else {
        showAlert('Please choose collector')
        setTimeout(() => {
          this.props.change('agentType', '')
        }, 10)
        return
      }
    }

    console.log(entity)
    this.props.fixDevice(entity)
  }

  ////////////////////////////////////////////////////////////////////////////////

  handleFormSubmit (values) {
    const {editDevice, credentials} = this.props
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

    if (config.credentials) {
      const creds = getDeviceCredentials(credentials, editDevice, true)
      if (creds.length === 0) {
        showAlert('Please add device credentials.')
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
        onChangeAgentType={this.onChangeAgentType.bind(this)}
      />
    )
  }
}

export default reduxForm({
  form: 'editDeviceFixForm'
})(DeviceFixModal)
