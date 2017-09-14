import React from 'react'
import {RadioButton, CircularProgress} from 'material-ui'
import {Field} from 'redux-form'
import {RadioButtonGroup} from 'redux-form-material-ui'
import CredentialModal from './CredentialModal'

import {FormSelect} from 'components/modal/parts'
import {showAlert} from 'components/common/Alert'

import {isWindowsDevice} from 'shared/Global'

export default class AgentPicker extends React.Component {
  componentWillReceiveProps (nextProps) {
    const {installAgentMessage} = nextProps
    if (!this.props.installAgentMessage && installAgentMessage) {
      showAlert(installAgentMessage)
    }
  }

  getCollectors () {
    const {editDevice, collectors} = this.props
    if (isWindowsDevice(editDevice)) {
      return collectors.filter(p => p.ostype === 'WINDOWS')
    }
    return collectors.filter(p => p.ostype === 'LINUX')
  }

  ///////////////////////////////////////////////////////////////

  getDeviceCreds () {
    const { editDevice, credentials } = this.props
    return credentials.filter(p => !p.global && p.deviceIds && p.deviceIds.indexOf(editDevice.id) >= 0)
  }

  onCloseCredPicker (props) {
    if (props) {
      const {editDevice} = this.props
      this.props.addCredentials({
        ...props,
        global: false,
        deviceIds: [editDevice.id]
      })

      setTimeout(() => {
        this.props.installAgent(this.props.editDevice)
      }, 100)
    }
    this.props.showDeviceCredsPicker(false)
  }

  ///////////////////////////////////////////////////////////////

  onClickInstall () {
    const creds = this.getDeviceCreds()
    if (!creds.length) {
      showAlert('Please add credential.', () => {
        this.props.showDeviceCredsPicker(true)
      });
      return;
    }

    this.props.installAgent(this.props.editDevice)
  }

  renderCredPicker () {
    if (!this.props.deviceCredsPickerVisible) return null

    return (
      <CredentialModal
        addCredentials={this.onCloseCredPicker.bind(this)}
        credentialTypes={this.props.credentialTypes}
        onClose={this.onCloseCredPicker.bind(this)}/>
    )
  }

  render () {
    const {editDevice, installAgents} = this.props
    let {agent} = editDevice

    const collectorOptions = this.getCollectors().map(p => ({
      label: p.name, value: p.id
    }))

    let agentLabel = 'Agent'
    if (!agent) {
      let installAgent = installAgents.filter(a => a.id === editDevice.id)
      installAgent = installAgent.length ? installAgent[0] : null
      const installing = installAgent && installAgent.status === 'installing'
      if (installAgent && installAgent.status === 'installed') {
        agent = {}
      } else {
        agentLabel = (
          <div>
            <div className="inline-block" style={{width: 100}}>Agent</div>
            <div
              className="inline-block"
              style={{textDecoration: 'underline', color: 'rgba(0, 0, 0, 0.87)', cursor: 'pointer'}}
              onClick={installing ? null : this.onClickInstall.bind(this)}>
              {installing ? 'Installing...' : 'Install Agent'}
            </div>
            {installing ? <CircularProgress className="valign-top margin-md-left" size={24}/> : null}
          </div>
        )
      }

    }

    const collectorLabel = (
      <div style={{width: 100}} className="inline-block">Collector</div>
    )

    return (
      <div style={{minHeight: 140}}>
        <Field name="agentType" component={RadioButtonGroup} className="margin-md-top">
          <RadioButton value="" label="None" className="pull-left"/>
          <RadioButton value="agent" label={agentLabel} className="pull-left" disabled={!agent} style={{marginTop: 14, cursor: 'pointer'}}
                       inputStyle={{width: 120}}/>
          <RadioButton value="collector" label={collectorLabel} className="pull-left" style={{width: 120, marginTop: 14}}/>
        </Field>

        <Field name="collectorId" label="Collector" component={FormSelect} className="pull-left" options={collectorOptions}/>
        {this.renderCredPicker()}
      </div>
    )
  }
}
