import React from 'react'
import MainIncidentPanel from '../../../../../components/page/content/dashboard/incidents/MainIncidentPanel'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

import { fetchIncidents, fixIncident, ackIncident } from '../../../../../actions'

@connect(
  state => ({ incidents: state.dashboard.incidents }),
  dispatch => ({
    ...bindActionCreators({
      fetchIncidents,
      fixIncident,
      ackIncident
    }, dispatch)
  })
)
@withRouter
export default class MainIncidentPanelContainer extends React.Component {
  render () {
    return (
      <MainIncidentPanel {...this.props} />
    )
  }
}

MainIncidentPanel.defaultProps = {
  hidden: false
}
