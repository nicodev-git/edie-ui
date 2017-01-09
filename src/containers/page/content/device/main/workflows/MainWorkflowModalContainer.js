import React from 'react'
import MainWorkflowModal from '../../../../../../components/page/content/device/main/workflows/MainWorkflowModal'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
// import { fetchDeviceWorkflows } from '../../../../../../actions'

@connect(
  state => ({
    // device: state.dashboard.selectedDevice,
    // workflows: state.devices.workflows
  }),
  dispatch => ({
    // fetchDeviceWorkflows: bindActionCreators(fetchDeviceWorkflows, dispatch)
  })
)
@withRouter
export default class MainRulesContainer extends React.Component {
  render () {
    return (
      <MainWorkflowModal {...this.props} />
    )
  }
}
