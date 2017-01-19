import React, { Component } from 'react'
import BigIncidents from 'components/page/content/bigIncidents/BigIncidents'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

import { fetchBigIncidents } from 'actions'

@connect(
  state => ({ incidents: state.dashboard.bigIncidents }),
  dispatch => ({
    fetchBigIncidents: bindActionCreators(fetchBigIncidents, dispatch)
  })
)
@withRouter
export default class BigIncidentsContainer extends Component {
  render () {
    return (
      <BigIncidents {...this.props} />
    )
  }
}
