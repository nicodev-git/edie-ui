import React, { Component } from 'react'
import Main from '../../components/page/Main'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { closeDevice } from '../../actions/DeviceActions'
import { closeApiErrorModal } from 'actions/DashboardActions'
import { bindActionCreators } from 'redux'

@connect((state) => {
  return {
    device: state.dashboard.selectedDevice,
    apiErrorModalOpen: state.dashboard.apiErrorModalOpen,
    apiError: state.dashboard.apiError
  }
},
dispatch => bindActionCreators({
  closeDevice,
  closeApiErrorModal
}, dispatch))
@withRouter
export default class MainContainer extends Component {
  render () {
    return (
      <Main closeDevice={closeDevice} {...this.props} />
    )
  }
}
