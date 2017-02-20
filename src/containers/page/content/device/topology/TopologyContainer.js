import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateMapDevice } from 'actions'

import Topology from 'components/page/content/device/topology/Topology'

@connect(
  state => ({ device: state.dashboard.selectedDevice }),
  dispatch => ({
    updateMapDevice: bindActionCreators(updateMapDevice, dispatch)
  })
)
@withRouter
export default class TopologyContainer extends React.Component {
  render () {
    return (
      <Topology {...this.props} />
    )
  }
}
