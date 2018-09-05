import React from 'react'
import General from 'components/sidebar/settings/general/General'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  fetchEnvVars,
  addEnvVar,
  updateEnvVar,

  updateUserOption,
  syncData,

  fetchRoles,
  updateRole,
  eddieSync,

  showImportSyncModal,
  importSyncData,
  showSimulationModal,
  postIncidentSimulation,

  fetchTimezone,
  saveTimezone
} from 'actions'

class GeneralContainer extends React.Component {
  render () {
    return (
      <General {...this.props} />
    )
  }
}
export default connect(
  state => ({
    envVars: state.settings.envVars,
    userInfo: state.dashboard.userInfo,
    timezoneOffset: state.settings.timezoneOffset,

    roles: state.settings.roles,

    syncStatus: state.settings.syncStatus,
    importSyncModalOpen: state.settings.importSyncModalOpen,
    simulationModalOpen: state.settings.simulationModalOpen
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchEnvVars,
      addEnvVar,
      updateEnvVar,

      updateUserOption,
      syncData,

      fetchRoles,
      updateRole,
      eddieSync,

      showImportSyncModal,
      importSyncData,
      showSimulationModal,
      postIncidentSimulation,

      fetchTimezone,
      saveTimezone
    }, dispatch)
  })
)(GeneralContainer)
