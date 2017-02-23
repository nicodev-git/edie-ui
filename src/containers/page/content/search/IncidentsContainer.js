import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

import {
  searchIncidents,
  fixIncident,
  ackIncident,
  searchIncidentDevices,
  fixAllIncidentsByType
} from 'actions'
import Incidents from 'components/page/content/search/Incidents'

@withRouter
@connect(
  state => ({
    incidents: state.search.incidents,
    incidentDevices: state.search.incidentDevices,
    incidentDraw: state.search.incidentDraw
  }),
  dispatch => ({
    ...bindActionCreators({
      searchIncidents,
      fixIncident,
      ackIncident,
      searchIncidentDevices,
      fixAllIncidentsByType
    }, dispatch)
  })
)
export default class IncidentsContainer extends Component {
  render () {
    return (
      <Incidents {...this.props} />
    )
  }
}

Incidents.defaultProps = {
  filter: null
}
