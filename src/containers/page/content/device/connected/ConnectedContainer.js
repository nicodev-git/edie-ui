import React from 'react'
import Connected from 'components/page/content/device/connected/Connected'
import {withRouter} from 'react-router'
import { connect } from 'react-redux'

@connect(
  state => ({ device: state.dashboard.selectedDevice })
)
@withRouter
export default class ConnectedContainer extends React.Component {
  render () {
    return (
      <Connected {...this.props} />
    )
  }
}
