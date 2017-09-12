import React from 'react'
import { connect } from 'react-redux'
import DeviceEditModal from 'components/common/wizard/DeviceEditModal'

import {
  fetchMonitorTemplates,
  openDeviceMonitorWizard,
  fetchCredTypes,
  fetchCredentials,

  fetchMonitorGroups,
  fetchCollectors
} from 'actions'

class DeviceEditModalContainer extends React.Component {
  render () {
    return (
      <DeviceEditModal {...this.props} />
    )
  }
}

export default connect(
  state => ({
    initialValues: state.devices.editDevice,

    monitorTemplates: state.settings.monitorTemplates,
    deviceTemplates: state.settings.deviceTemplates,
    collectors: state.settings.collectors,
    credentials: state.settings.credentials,
    credentialTypes: state.settings.credentialTypes,

    monitorGroups: state.settings.monitorGroups
  }), {
    fetchMonitorTemplates,
    openDeviceMonitorWizard,
    fetchCredTypes,
    fetchCredentials,

    fetchMonitorGroups,
    fetchCollectors
  }
)(DeviceEditModalContainer)
