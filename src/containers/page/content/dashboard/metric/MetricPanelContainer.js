import React from 'react'
import MetricPanel from '../../../../../components/page/content/dashboard/metric/MetricPanel'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

@withRouter
class MetricPanelContainer extends React.Component {
  render () {
    return (
      <MetricPanel {...this.props} />
    )
  }
}

export default connect(
  state => ({ stats: state.dashboard.stats }),
  dispatch => ({ /* ... */ })
)(MetricPanelContainer)
