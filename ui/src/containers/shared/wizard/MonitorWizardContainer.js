import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import MonitorWizard from 'components/common/wizard/MonitorWizard'

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
    initialValues: state.devices.monitorInitialValues,

    paramsModalOpen: state.devices.paramsModalOpen,
    paramEditModalOpen: state.devices.paramEditModalOpen,

    editParams: state.devices.editParams,
    monitorTagModalOpen: state.devices.monitorTagModalOpen,
    monitorTags: state.devices.monitorTags,
    monitorConfig: state.devices.monitorConfig,

    selectedDevice: state.dashboard.selectedDevice,
    deviceCredsPickerVisible: state.devices.deviceCredsPickerVisible,

    collectors: state.settings.collectors
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
