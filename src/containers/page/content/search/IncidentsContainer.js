import React, { Component } from 'react'
import Incidents from '../../../../components/page/content/search/Incidents'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  searchIncidents,
  fixIncident,
  ackIncident
} from '../../../../actions'

@connect(
  state => ({ incidents: state.search.incidents }),
  dispatch => ({
    ...bindActionCreators({
      searchIncidents,
      fixIncident,
      ackIncident
    }, dispatch)
  })
)
export default class Incidents extends Component {
  render () {
    return (
      <Incidents {...this.props} />
    )
  }
}

Incidents.defaultProps = {
  filter: null
}
