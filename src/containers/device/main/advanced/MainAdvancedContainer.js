import React, { Component } from 'react'
import MainAdvanced from 'components/device/main/advanced/MainAdvanced'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'

@connect(
  state => ({ device: state.dashboard.selectedDevice })
)
@withRouter
export default class MainAdvancedContainer extends Component {
  render () {
    return (
      <MainAdvanced {...this.props} />
    )
  }
}
