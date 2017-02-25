import React, { Component } from 'react'
import Main from '../../components/page/Main'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  closeDevice,
  closeApiErrorModal,

  activateUser
} from 'actions'

@connect((state) => {
  return {
    device: state.dashboard.selectedDevice,
    apiErrorModalOpen: state.dashboard.apiErrorModalOpen,
    apiError: state.dashboard.apiError,

    activated: state.auth.activated,
    activationMsg: state.auth.activationMsg
  }
},
dispatch => bindActionCreators({
  closeDevice,
  closeApiErrorModal,

  activateUser
}, dispatch))
@withRouter
export default class MainContainer extends Component {
  render () {
    return (
      <Main closeDevice={closeDevice} {...this.props} />
    )
  }
}
