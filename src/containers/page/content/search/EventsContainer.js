import React from 'react'
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
import Events from 'components/page/content/search/Events'

@withRouter
@connect(
  state => ({

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
export default class EventsContainer extends React.Component {
  render () {
    return (
      <Events {...this.props} />
    )
  }
}
