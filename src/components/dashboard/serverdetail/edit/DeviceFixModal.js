import React from 'react'
import { reduxForm } from 'redux-form'
import {CircularProgress} from '@material-ui/core'

import DeviceFixModalView from './DeviceFixModalView'
import {showAlert} from 'components/common/Alert'
import {
  getDeviceCredentials, getAgentStatusMessage, getDeviceCollectors,
  isWindowsDevice
} from 'shared/Global'
import CollectorInstallModal from 'components/common/wizard/input/CollectorInstallModal'

class DeviceFixModal extends React.Component {
  componentWillMount () {
    this.props.fetchCredentials()
    this.props.fetchCredTypes()
    this.props.fetchCollectors()
  }

  componentDidMount () {
    // const config = this.getConfig()
    // if (!config.agentPick) return
    // this.onChangeAgentType(null, this.props.formValues.agentType || 'collector')
  }

  getStatusMessage (code) {
    return getAgentStatusMessage(code)
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
      credentials: fixCode === 1 || fixCode === 4 || fixCode === 2,
      distribution: fixCode === 3
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

  onClickEditCreds (sel) {
    this.props.showDeviceCredsPicker(true, sel)
  }

  onChangeAgentType (e, value) {
    this.checkDevice({
      agentType: value
    })
  }

  checkDevice (extra) {
    const {editDevice, formValues} = this.props

    const entity = {
      ...editDevice,
      ...formValues,
      ...extra
    }

    if (entity.agentType === 'collector') {
      if (!formValues.collectorId) {
        this.props.showCollectorInstallModal(true)
        return
      }
    }

    console.log(entity)
    this.props.fixDevice(entity)
  }

  onChangeIntegrated (e, checked) {
    this.checkDevice({
      useIntegratedSecurity: checked
    })
  }

  onReplaceCreds (oldCred, newCred) {
    const {editDevice} = this.props
    if ((oldCred.deviceIds || []).includes(editDevice.id)) {
      this.props.updateCredentials({
        ...oldCred,
        deviceIds: oldCred.deviceIds.filter(p => p !== editDevice.id)
      })
    }

    if (!(newCred.deviceIds || []).includes(editDevice.id)) {
      this.props.updateCredentials({
        ...newCred,
        deviceIds: [...(newCred.deviceIds || []), editDevice.id]
      })
    }
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
      const creds = getDeviceCredentials(editDevice, credentials, true)
      if (creds.length === 0 && !values.useIntegratedSecurity) {
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

  renderCollectorInstallModal () {
    if (!this.props.collectorInstallModalOpen) return null
    const {collectorTestStatus, showCollectorInstallModal, fetchCollectors, testCollector} = this.props
    const collectors = getDeviceCollectors(this.props.editDevice, this.props.collectors)
    return (
      <CollectorInstallModal
        collectorTestStatus={collectorTestStatus}
        showCollectorInstallModal={showCollectorInstallModal}
        fetchCollectors={fetchCollectors}
        testCollector={testCollector}
        collectors={collectors}
      />
    )
  }

  render () {
    const { handleSubmit, editDevice } = this.props

    return (
      <DeviceFixModalView
        {...this.props}
        config={this.getConfig()}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        msg={this.getMessage()}
        onHide={this.onHide.bind(this)}
        onClickAddCreds={this.onClickAddCreds.bind(this)}
        onClickEditCreds={this.onClickEditCreds.bind(this)}
        onChangeAgentType={this.onChangeAgentType.bind(this)}
        modals={this.renderCollectorInstallModal()}

        isWin={isWindowsDevice(editDevice)}
        onChangeIntegrated={this.onChangeIntegrated.bind(this)}
        onReplaceCreds={this.onReplaceCreds.bind(this)}
      />
    )
  }
}

export default reduxForm({
  form: 'editDeviceFixForm'
})(DeviceFixModal)
