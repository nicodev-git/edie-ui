import React from 'react'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'

import MainControl from 'components/dashboard/serverdetail/MainControl'
import {
  fetchGauges,
  fetchCredTypes,
  fetchCredentials,
  fetchGaugeBoards,

  fetchDeviceWorkflows,

  showDeviceEditModal,
  updateMapDevice,
  showDeviceFixModal,

  showDeviceCredsModal,
  selectDeviceCreds,
  showDeviceCredsPicker,

  removeCredentials,
  addCredentials,
  updateCredentials,

  fetchDevice,
  showCredListModal,
  fetchMonitorTemplates,
  addBasicMonitors,

  showDeviceMonitorsModal,
  openDeviceMonitorWizard,

  showGaugePicker,
  removeWorkflow,
  fetchWorkflows
} from 'actions'

class MainControlContainer extends React.Component {
  render () {
    return (
      <MainControl {...this.props}/>
    )
  }
}
export default connect(
  state => ({
    devices: state.devices.devices,
    deviceWorkflows: state.devices.workflows,
    allDevices: state.devices.deviceAndGroups,
    deviceEditModalOpen: state.devices.deviceEditModalOpen,
    editDevice: state.devices.editDevice,
    deviceCredsModalOpen: state.devices.deviceCredsModalOpen,
    deviceCredsPickerVisible: state.devices.deviceCredsPickerVisible,
    selectedDeviceCreds: state.devices.selectedDeviceCreds,

    deviceMonitorsModalOpen: state.devices.deviceMonitorsModalOpen,
    monitorTemplates: state.settings.monitorTemplates,
    deviceTemplates: state.settings.deviceTemplates,
    monitorGroups: state.settings.monitorGroups,

    credModalDefaultType: state.devices.credModalDefaultType,
    credListModalOpen: state.settings.credListModalOpen,

    deviceFixModalOpen: state.devices.deviceFixModalOpen,

    credentials: state.settings.credentials,
    credentialTypes: state.settings.credentialTypes,

    gauges: state.gauge.gauges,
    gaugeBoards: state.gauge.gaugeBoards,
    gaugeModalOpen: state.gauge.gaugeModalOpen,
    editGauge: state.gauge.editGauge,
    gaugePickerOpen: state.gauge.gaugePickerOpen,

    workflowDraw: state.settings.workflowDraw,

    workflows: state.workflow.workflows,

    userInfo: state.dashboard.userInfo
  }), {
    fetchGauges,
    fetchCredTypes,
    fetchCredentials,
    fetchGaugeBoards,

    fetchDeviceWorkflows,

    showDeviceEditModal,
    updateMapDevice,
    showDeviceFixModal,

    showDeviceCredsModal,
    selectDeviceCreds,
    showDeviceCredsPicker,

    removeCredentials,
    addCredentials,
    updateCredentials,

    fetchDevice,
    showCredListModal,
    fetchMonitorTemplates,
    addBasicMonitors,

    showDeviceMonitorsModal,
    openDeviceMonitorWizard,

    showGaugePicker,
    removeWorkflow,
    fetchWorkflows
  }
)(withRouter(MainControlContainer))
