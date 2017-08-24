import React from 'react'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'

import LogView from 'components/dashboard/log/LogView'

import {updateViewLogParams} from 'actions'

class LogViewContainer extends React.Component {
  render () {
    return (
      <LogView {...this.props}/>
    )
  }
}
export default connect(
  state => ({
    logViewParam: state.dashboard.logViewParam
  }), {
    updateViewLogParams
  }
)(withRouter(LogViewContainer))
