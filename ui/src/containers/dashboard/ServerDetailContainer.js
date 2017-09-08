import React from 'react'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'

import ServerDetail from 'components/dashboard/serverdetail/ServerDetail'

import {
  updateViewLogParams,
  showDetailLogModal
} from 'actions'

class ServerDetailContainer extends React.Component {
  render () {
    return (
      <ServerDetail {...this.props}/>
    )
  }
}
export default connect(
  state => ({
    logViewParam: state.dashboard.logViewParam,

    detailLogModalOpen: state.dashboard.detailLogModalOpen,
    detailLogViewParam: state.dashboard.detailLogViewParam
  }), {
    updateViewLogParams,
    showDetailLogModal
  }
)(withRouter(ServerDetailContainer))
