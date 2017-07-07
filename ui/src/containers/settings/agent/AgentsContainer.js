import React from 'react'
import Agents from 'components/sidebar/settings/agent/Agents'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import {
  fetchEnvVars,
  addEnvVar,
  updateEnvVar,

  updateUserOption
} from 'actions'

class AgentsContainer extends React.Component {
  render () {
    return (
      <Agents {...this.props} />
    )
  }
}
export default connect(
  state => ({
    envVars: state.settings.envVars,
    userInfo: state.dashboard.userInfo
  }), {
    fetchEnvVars,
    addEnvVar,
    updateEnvVar,

    updateUserOption
  }
)(withRouter(AgentsContainer))
