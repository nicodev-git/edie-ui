import React from 'react'
import Advanced from 'components/page/content/settings/advanced/Advanced'
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

@connect(
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
)
export default class AdvancedContainer extends React.Component {
  render () {
    return (
      <Advanced {...this.props} />
    )
  }
}
