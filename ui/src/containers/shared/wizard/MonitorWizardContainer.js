import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {MonitorWizard} from 'components/common/wizard/DeviceWizard'

import {
  fetchMonitorTemplates,
  openParamsModal,

  openParamEditModal,
  closeParamsModal,
  removeParam,
  updateMonitorParams,

  showDeviceCredsPicker,

  updateMonitorTags,
  showMonitorTagModal
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

    selectedDevice: state.dashboard.selectedDevice,
    deviceCredsPickerVisible: state.devices.deviceCredsPickerVisible
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
      showMonitorTagModal
    }, dispatch)
  })
)(MonitorWizardContainer)
