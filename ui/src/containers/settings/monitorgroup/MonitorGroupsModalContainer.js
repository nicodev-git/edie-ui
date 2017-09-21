import React from 'react'
import { connect } from 'react-redux'

import MonitorGroupsModal from 'components/sidebar/settings/monitorgroup/MonitorGroupsModal'

import {
  fetchMonitorGroups,

  showMonitorGroupsModal,
  showMonitorGroupModal
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
    monitorGroupModalOpen: state.settings.monitorGroupModalOpen
  }), {
    fetchMonitorGroups,

    showMonitorGroupsModal,
    showMonitorGroupModal
  }
)(MonitorGroupsModalContainer)
