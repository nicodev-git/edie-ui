import React from 'react'
import Dashboard from '../../../../components/page/content/dashboard/Dashboard'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateDashboard } from '../../../../actions'

class DashboardContainer extends React.Component {
  render () {
    return (
      <Dashboard {...this.props} />
    )
  }
}

DashboardContainer.defaultProps = {
  hidden: false
}

export default connect(
  state => ({ /* ... */ }),
  dispatch => ({
    updateDashboard: bindActionCreators(updateDashboard, dispatch)
  })
)(DashboardContainer)
