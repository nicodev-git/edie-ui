import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {getFormValues} from 'redux-form'

import MonitorWizard from 'components/common/wizard/MonitorWizard'

import {isWindowsDevice, getRemoveAfter, basicMonitorTypes} from 'shared/Global'

import {
  fetchMonitorTemplates,
  openParamsModal,

  openParamEditModal,
  closeParamsModal,
  removeParam,
  updateMonitorParams,

  showDeviceCredsPicker,

  updateMonitorTags,
  showMonitorTagModal,

  updateMapDevice,

  fetchCollectors
} from 'actions'

class MonitorWizardContainer extends React.Component {
  render () {
    return (
      <MonitorWizard {...this.props} canAddTags checkCreds/>
    )
  }
}

const getDefaultCollectorId = (device, collectors) => {
  if (!device || !collectors.length) return ''
  let found
  if (isWindowsDevice(device)) {
    found = collectors.filter(p => p.ostype === 'WINDOWS')
  } else {
    found = collectors.filter(p => p.ostype === 'LINUX')
  }
  return found.length ? found[0].id : ''
}

const getDefaultParams = (initialValues) => {
  const {params} = initialValues
  if (initialValues.monitortype !== 'basic') return params

  const basicMonitor = {}
  basicMonitorTypes.forEach(t => {
    basicMonitor[t] = {
      removeEnabled: true,
      duration: 1,
      durationUnit: 'hours'
    }
  })

  return {
    ...params,
    basicMonitor
  }
}

export default connect(
  state => ({
    initialValues: {
      agentType: state.dashboard.selectedDevice && state.dashboard.selectedDevice.agent ? 'agent' : 'collector',
      collectorId: getDefaultCollectorId(state.dashboard.selectedDevice, state.settings.collectors),
      // credentialId: (state.dashboard.selectedDevice.credentials || []).length ? state.dashboard.selectedDevice.credentials[0].id : '',

      ...state.devices.monitorInitialValues.params,
      checkinterval: ((state.devices.monitorInitialValues.params || {}).checkinterval || 0) / 1000,
      ...getRemoveAfter(state.devices.monitorInitialValues),
      ...state.devices.monitorInitialValues
    },
    allValues: getFormValues('monitorWizardForm')(state),

    paramsModalOpen: state.devices.paramsModalOpen,
    paramEditModalOpen: state.devices.paramEditModalOpen,

    editParams: state.devices.editParams,
    monitorTagModalOpen: state.devices.monitorTagModalOpen,
    monitorTags: state.devices.monitorTags,
    monitorConfig: state.devices.monitorConfig,

    selectedDevice: state.dashboard.selectedDevice,
    deviceCredsPickerVisible: state.devices.deviceCredsPickerVisible,

    collectors: state.settings.collectors,
    credentials: state.settings.credentials
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchMonitorTemplates,
      openParamsModal,

      openParamEditModal,
      closeParamsModal,
      removeParam,
      updateMonitorParams,

      showDeviceCredsPicker,

      updateMonitorTags,
      showMonitorTagModal,

      updateMapDevice,

      fetchCollectors
    }, dispatch)
  })
)(MonitorWizardContainer)
