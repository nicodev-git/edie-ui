import React from 'react'
import { assign, keys } from 'lodash'
import { reduxForm } from 'redux-form'

import ParamEditModal from './input/ParamEditModal'
import TagsView from './input/TagsView'
import ParamList from './input/ParamList'

import CredPicker from 'containers/settings/credentials/CredsPickerContainer'
import MonitorWizardView from './MonitorWizardView'

import {showAlert} from 'components/common/Alert'

class MonitorWizard extends React.Component {
  componentDidMount () {
    if (!this.hasCreds()) {
      // this.props.showDeviceCredsPicker(true)
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
    const {monitorConfig, selectedDevice, collectors} = this.props
    const credTypes = monitorConfig.credentialTypes || []

    //Step 1
    if (selectedDevice.agent) return false

    //Step 2
    if (credTypes.length === 0) return false

    //Step 3
    // if (monitorConfig.needWindowsAgentCollector)
    if (collectors.length > 2) return false
    return true
  }

  handleFormSubmit (values) {
    const { extraParams, onFinish, editParams, canAddTags, monitorTags } = this.props
    const params = {}
    if (editParams) {
      editParams.forEach(p => {
        params[p.key] = p.value
      })
    }

    if (values.checkinterval !== null) {
      values.checkinterval = values.checkinterval * 1000
    }

    const props = assign(
      {},
      values,
      extraParams, {
        params
      }
    )

    //Merge required params
    this.getRequiredParamKeys().forEach(key => {
      props.params[key] = props[key]
      delete props[key]
    })

    if (canAddTags) props.tags = monitorTags || []
    console.log(props)
    this.closeModal(true)
    onFinish && onFinish(null, props)
  }

  closeModal (data) {
    this.props.onClose && this.props.onClose(this, data)
  }
  onCloseCredPicker (selected) {
    if (selected) {
      const {selectedDevice} = this.props
      const props = {
        ...selectedDevice,
        credentials: [selected]
      }
      this.props.updateMapDevice(props)
    }
    this.props.showDeviceCredsPicker(false)
  }
  getRequiredParamKeys() {
    return keys(this.props.monitorConfig.params || {})
  }
  renderParamEditModal () {
    if (!this.props.paramEditModalOpen) return null
    return (
      <ParamEditModal/>
    )
  }

  renderTags () {
    if (!this.props.canAddTags) return null
    return (
      <TagsView {...this.props}/>
    )
  }

  renderCredPicker () {
    if (!this.props.deviceCredsPickerVisible) return null
    return (
      <CredPicker onClose={this.onCloseCredPicker.bind(this)}/>
    )
  }
  renderParamList () {
    return (
      <ParamList
        editParams={this.props.editParams}
        openParamEditModal={this.props.openParamEditModal}
        closeParamsModal={this.props.closeParamsModal}
        removeParam={this.props.removeParam}
        updateMonitorParams={this.props.updateMonitorParams}
        monitorConfig={this.props.monitorConfig}
      />
    )
  }
  render () {
    const { title, handleSubmit, monitorConfig, selectedDevice, collectors } = this.props
    const header = title || `${monitorConfig.name} Monitor`
    const paramEditModal = this.renderParamEditModal()
    const credentials = (selectedDevice.credentials || []).map(p => ({
      label: p.name,
      value: p.id
    }))
    return (
      <MonitorWizardView
        header={header}
        paramEditModal={paramEditModal}
        onHide={this.closeModal.bind(this)}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        tagsView={this.renderTags()}

        requiredParamKeys={this.getRequiredParamKeys()}
        paramsView={this.renderParamList()}

        credPicker={this.renderCredPicker()}
        credentials={credentials}

        showAgentType={this.showAgentType()}
        collectors={collectors}

        agent={!!selectedDevice.agent}
      />
    )
  }
}

export default reduxForm({
  form: 'monitorWizardForm'
})(MonitorWizard)
