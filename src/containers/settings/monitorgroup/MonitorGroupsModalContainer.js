import React from 'react'
import { connect } from 'react-redux'

import MonitorGroupsModal from 'components/sidebar/settings/monitorgroup/MonitorGroupsModal'

import {
  fetchMonitorGroups,

  showMonitorGroupsModal,
  showMonitorGroupModal,
  addMonitorGroup,
  updateMonitorGroup,
  removeMonitorGroup
} from 'actions'

class MonitorGroupsModalContainer extends React.Component {
  render () {
    return (
      <MonitorGroupsModal {...this.props}/>
    )
  }
}

export default connect(
  state => ({
    monitorGroups: state.settings.monitorGroups,
    monitorGroupModalOpen: state.settings.monitorGroupModalOpen,
    editMonitorGroup: state.settings.editMonitorGroup,

    allDevices: state.devices.deviceAndGroups
  }), {
    fetchMonitorGroups,

    showMonitorGroupsModal,
    showMonitorGroupModal,
    addMonitorGroup,
    updateMonitorGroup,
    removeMonitorGroup
  }
)(MonitorGroupsModalContainer)
