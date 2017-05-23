import React from 'react'
import General from 'components/page/content/settings/general/General'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  fetchEnvVars,
  addEnvVar,
  updateEnvVar,

  updateUserOption
} from 'actions'

@connect(
  state => ({
    envVars: state.settings.envVars,
    userInfo: state.dashboard.userInfo
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchEnvVars,
      addEnvVar,
      updateEnvVar,

      updateUserOption
    }, dispatch)
  })
)
export default class GeneralContainer extends React.Component {
  render () {
    return (
      <General {...this.props} />
    )
  }
}
