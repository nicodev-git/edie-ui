import React from 'react'
import Advanced from 'components/page/content/settings/advanced/Advanced'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  fetchEnvVars,
  addEnvVar,
  updateEnvVar,
  syncData
} from 'actions'

@connect(
  state => ({
    envVars: state.settings.envVars,
    syncStatus: state.settings.syncStatus
  }),
  dispatch => ({
    ...bindActionCreators({
      fetchEnvVars,
      addEnvVar,
      updateEnvVar,
      syncData
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
