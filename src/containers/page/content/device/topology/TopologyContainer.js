import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { addGroupDevice, updateGroupDevice, removeGroupDevice } from 'actions'

import Topology from 'components/page/content/device/topology/Topology'

@connect(
  state => ({
    device: state.dashboard.selectedDevice,
    deviceTemplates: state.settings.deviceTemplates
  }), {
    addGroupDevice,
    updateGroupDevice,
    removeGroupDevice
  }
)
@withRouter
export default class TopologyContainer extends React.Component {
  render () {
    return (
      <Topology {...this.props} />
    )
  }
}
