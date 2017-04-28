import React from 'react'
import General from 'components/page/content/settings/general/General'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  fetchEnvVars,
  addEnvVar,
  updateEnvVar
} from 'actions'

@connect(
  state => ({ envVars: state.settings.envVars }),
  dispatch => ({
    ...bindActionCreators({
      fetchEnvVars,
      addEnvVar,
      updateEnvVar
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
