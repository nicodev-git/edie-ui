import React from 'react'
import Advanced from 'components/sidebar/settings/advanced/Advanced'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  fetchEnvVars,
  addEnvVar,
  updateEnvVar,
  syncData,
  showImportSyncModal,
  importSyncData
} from 'actions'

class AdvancedContainer extends React.Component {
  render () {
    return (
      <Advanced {...this.props} />
    )
  }
}

export default connect(
  state => ({
    envVars: state.settings.envVars,
    syncStatus: state.settings.syncStatus,
    importSyncModalOpen: state.settings.importSyncModalOpen
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchEnvVars,
      addEnvVar,
      updateEnvVar,
      syncData,
      showImportSyncModal,
      importSyncData
    }, dispatch)
  })
)(AdvancedContainer)
