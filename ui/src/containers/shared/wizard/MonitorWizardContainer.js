import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import MonitorWizard from 'components/common/wizard/MonitorWizard'

import {getRemoveAfter} from 'shared/Global'

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

export default connect(
  state => ({
    initialValues: {
      agentType: state.dashboard.selectedDevice && state.dashboard.selectedDevice.agent ? 'agent' : 'collector',
      collectorId: state.settings.collectors.length ? state.settings.collectors[0].id : '',
      // credentialId: (state.dashboard.selectedDevice.credentials || []).length ? state.dashboard.selectedDevice.credentials[0].id : '',

      ...state.devices.monitorInitialValues.params,
      checkinterval: ((state.devices.monitorInitialValues.params || {}).checkinterval || 0) / 1000,
      ...getRemoveAfter(state.devices.monitorInitialValues),
      ...state.devices.monitorInitialValues
    },

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
