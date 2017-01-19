import React, { Component } from 'react'
import MainRulesAdd from '../../../../../../components/page/content/device/main/ruleAdd/MainRulesAdd'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {fetchDevicePhysicalRules} from '../../../../../../actions'

@connect(
  state => ({
    device: state.dashboard.selectedDevice,
    physicalRules: state.devices.physicalRules
  }),
  dispatch => ({
    fetchDevicePhysicalRules: bindActionCreators(fetchDevicePhysicalRules, dispatch)
  })
)
@withRouter
export default class MainRulesAddContainer extends Component {
  render () {
    return (
      <MainRulesAdd {...this.props} />
    )
  }
}
