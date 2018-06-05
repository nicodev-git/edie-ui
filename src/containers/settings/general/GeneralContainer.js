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
  eddieSync
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

    roles: state.settings.roles
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
      eddieSync
    }, dispatch)
  })
)(GeneralContainer)
