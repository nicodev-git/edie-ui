import React from 'react'

import MonitorWizardView from './MonitorWizardView'

export default class MonitorWizard extends React.Component {
  constructor (props) {
    super(props)

    // const stepItems = cloneDeep(config.steps)
    // if (this.showAgentType()) {
    //   stepItems[0].items = [...config.creds, ...stepItems[0].items]
    // }

    this.state = {
      currentDevice: {...config, steps: stepItems},
      monitors: props.monitors || []
    }
  }
  componentWillMount () {
    const hasMonitors = this.state.currentDevice.steps.filter(s =>
        s.items.filter(i => i.type === 'monitors').length > 0
      ).length > 0

    if (hasMonitors) {
      this.props.fetchMonitorTemplates()
    }

    if (!this.hasCreds()) {
      this.props.showDeviceCredsPicker(true)
    }
  }

  hasCreds () {
    const {selectedDevice, monitorConfig} = this.props

    if (this.showAgentType()) {
      const credTypes = monitorConfig.credentialTypes || []
      const creds = selectedDevice.credentials || []
      let found = true
      credTypes.forEach(type => {
        if (!creds.filter(p => p.type === type).length)
          found = false
      })
      return found
    }
    return true
  }

  showAgentType () {
    const {checkCreds, monitorConfig, selectedDevice, collectors} = this.props
    if (checkCreds) {
      if (selectedDevice.agent) return false
      const credTypes = monitorConfig.credentialTypes || []
      if (credTypes.length === 0) return false
      if (collectors.length > 2) return false
      return true
    }
    return false
  }

  render () {
    const { handleSubmit } = this.props
    const header = this.props.title || this.state.currentDevice.title || ''
    const paramEditModal = this.renderParamEditModal()
    return (
      <DeviceWizardView
        header={header}
        paramEditModal={paramEditModal}
        onHide={this.closeModal.bind(this)}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        credPicker={this.renderCredPicker()}
      />
    )
  }
}
