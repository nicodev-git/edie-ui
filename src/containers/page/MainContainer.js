import React from 'react'
import Main from '../../components/page/Main'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import TouchBackend from 'react-dnd-touch-backend'

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
class MainContainer extends React.Component {
  render () {
    return (
      <Main closeDevice={closeDevice} {...this.props} />
    )
  }
}

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(MainContainer)
