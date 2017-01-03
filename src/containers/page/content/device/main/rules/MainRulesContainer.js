import React from 'react'
import MainRules from '../../../../../../components/page/content/device/main/rules/MainRules'
import { fetchDeviceRules } from '../../../../../../actions'

@connect(
  state => ({
    device: state.dashboard.selectedDevice,
    rules: state.devices.rules
  }),
  dispatch => ({
    fetchDeviceRules: bindActionCreators(fetchDeviceRules, dispatch)
  })
)
@withRouter
export default class MainRulesContainer extends React.Component {
  render () {
    return (
      <MainRules {...this.props} />
    )
  }
}

MainRules.defaultProps = {
  onUpdateCategory: null
}
