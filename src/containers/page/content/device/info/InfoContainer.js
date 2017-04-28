import React from 'react'
import Info from 'components/page/content/device/info/Info'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateMapDevice } from '../../../../../actions'

@connect(
  state => ({ device: state.dashboard.selectedDevice }),
  dispatch => ({
    updateMapDevice: bindActionCreators(updateMapDevice, dispatch)
  })
)
@withRouter
export default class InfoContainer extends React.Component {
  render () {
    return (
      <Info {...this.props} />
    )
  }
}
