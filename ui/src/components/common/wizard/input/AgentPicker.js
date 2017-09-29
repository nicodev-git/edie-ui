import React from 'react'
import {RadioButton, CircularProgress, IconButton} from 'material-ui'
import {Field} from 'redux-form'
import {RadioButtonGroup} from 'redux-form-material-ui'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'

import CredentialModal from 'components/credentials/CredentialModal'

import {FormSelect} from 'components/modal/parts'
import {showAlert} from 'components/common/Alert'
import {isWindowsDevice, getDeviceCollectors} from 'shared/Global'

export default class AgentPicker extends React.Component {
  componentWillReceiveProps (nextProps) {
    const {installAgentMessage, meta, editDevice} = nextProps
    if (!this.props.installAgentMessage && installAgentMessage) {
      showAlert(installAgentMessage)
      if (isWindowsDevice(editDevice)) this.stopAgentCheck()
    }

    if (isWindowsDevice(editDevice) && !this.props.editDevice.agent && editDevice.agent) {
      this.props.updateInstallAgentStatus(editDevice, true)
    }

    if (this.props.meta && meta) {
      if (this.props.meta.active !== meta.active && meta.active) {
        nextProps.onChange(null, nextProps.formValues.agentType)
      }
    }
  }

  componentWillUnmount () {
    this.stopAgentCheck()
  }

  getCollectors () {
    const {editDevice, collectors} = this.props
    return getDeviceCollectors(editDevice, collectors)
  }
  ///////////////////////////////////////////////////////////////

  startAgentCheck () {
    this.agentCheckTimer = setInterval(() => {
      const {editDevice} = this.props
      if (!editDevice) return
      this.props.fetchDevice(editDevice.id)
    }, 3000)
  }

  stopAgentCheck () {
    clearInterval(this.agentCheckTimer)
  }

  ///////////////////////////////////////////////////////////////

  getDeviceCreds () {
    const { editDevice, credentials } = this.props
    const type = isWindowsDevice(editDevice) ? 'WINDOWS' : 'SSH'
    return credentials.filter(p =>
      (!p.global && p.deviceIds && p.deviceIds.indexOf(editDevice.id) >= 0) ||
      (p.global && p.default && p.type === type)
    )
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

  onClickAddCollector () {
    this.props.showCollectorInstallModal(true)
  }

  ///////////////////////////////////////////////////////////////

  onClickInstallAgent () {
    const creds = this.getDeviceCreds()
    if (!creds.length) {
      showAlert('Please add credential.', () => {
        this.props.showDeviceCredsPicker(2)
      });
      return
    }

    const {editDevice} = this.props
    const {agentCollectorId} = this.props.formValues
    if (isWindowsDevice(editDevice) && !agentCollectorId) {
      this.onClickAddCollector()
      return
    }

    this.props.installAgent(editDevice, agentCollectorId, () => {
      this.startAgentCheck()
    })
  }

  renderCredPicker () {
    if (this.props.deviceCredsPickerVisible !== 2) return null

    return (
      <CredentialModal
        addCredentials={this.onCloseCredPicker.bind(this)}
        credentialTypes={this.props.credentialTypes}
        onClose={this.onCloseCredPicker.bind(this)}/>
    )
  }

  render () {
    const {editDevice, installAgents, onChange} = this.props
    let {agent} = editDevice

    const collectorOptions = this.getCollectors().map(p => ({
      label: p.name, value: p.id
    }))

    let agentLabel = 'Agent'
    if (agent && (new Date().getTime() - agent.lastSeen) > 3 * 60 * 1000) agent = null

    if (!agent) {
      let installAgent = installAgents.filter(a => a.id === editDevice.id)
      installAgent = installAgent.length ? installAgent[0] : null
      const installing = installAgent && installAgent.status === 'installing'
      if (installAgent && installAgent.status === 'installed') {
        agent = {}
      } else {
        const isWin = isWindowsDevice(editDevice)

        agentLabel = (
          <div>
            <div className="inline-block" style={{width: 100}}>Agent</div>
            <div
              className="inline-block"
              style={{textDecoration: 'underline', color: 'rgba(0, 0, 0, 0.87)', cursor: 'pointer'}}
              onClick={installing ? null : this.onClickInstallAgent.bind(this)}>
              {installing ? 'Installing...' : 'Install Agent'}
            </div>
            {
              isWin ? (
                <div className="inline-block margin-md-left">
                  <label className="margin-md-right">via</label>
                  <Field name="agentCollectorId" label="Collector"
                         component={FormSelect} className="valign-top" options={collectorOptions}
                         style={{marginTop: -12, width: 180}}/>
                </div>
              ) : null
            }
            {installing ? <CircularProgress className="valign-top margin-md-left" size={24}/> : null}
          </div>
        )
      }
    }

    const collectorLabel = (
      <div style={{width: 100}} className="inline-block">Collector</div>
    )

    return (
      <div style={{minHeight: 110}}>
        <Field name="agentType" component={RadioButtonGroup} className="margin-md-top" onChange={onChange}>
          <RadioButton value="" label="None" className="pull-left"/>
          <RadioButton value="agent" label={agentLabel} className="pull-left" disabled={!agent} style={{marginTop: 14, cursor: 'pointer'}}
                       inputStyle={{width: 120}}/>
          <RadioButton value="collector" label={collectorLabel} className="pull-left" style={{width: 120, marginTop: 14}}/>
        </Field>

        <Field name="collectorId" label="Collector" component={FormSelect} className="pull-left" options={collectorOptions}/>
        <IconButton className="pull-left hidden" onTouchTap={this.onClickAddCollector.bind(this)}><AddCircleIcon/></IconButton>
        {this.renderCredPicker()}
      </div>
    )
  }
}
