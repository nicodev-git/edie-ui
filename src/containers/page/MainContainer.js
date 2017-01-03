import React, { Component } from 'react'
import Main from '../../components/page/Main'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { closeDevice } from '../../actions/DeviceActions'
import { bindActionCreators } from 'redux'

@connect((state) => {
  return {
    device: state.dashboard.selectedDevice
  }
},
dispatch => bindActionCreators({
  closeDevice
}))
@withRouter
export default class MainContainer extends Component {
  render () {
    return (
      <Main closeDevice={closeDevice} {...this.props} />
    )
  }
}
