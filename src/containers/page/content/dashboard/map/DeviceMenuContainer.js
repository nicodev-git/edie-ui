import React from 'react'
import DeviceMenu from '../../../../../components/page/content/dashboard/map/DeviceMenu'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  fetchDeviceTemplates
} from '../../../../../actions'

@connect(
  state => ({ deviceTemplates: state.settings.deviceTemplates }),
  dispatch => ({
    fetchDeviceTemplates: bindActionCreators(fetchDeviceTemplates, dispatch)
  })
)
export default class DeviceMenuContainer extends React.Component {
  render () {
    return (
      <DeviceMenu {...this.props} />
    )
  }
}

DeviceMenu.defaultProps = {
  selectedItem: {},
  onClickItem: null
}
