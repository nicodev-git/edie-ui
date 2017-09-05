import React from 'react'
import { connect } from 'react-redux'
import {
  fetchDeviceTemplates
} from 'actions'

import DeviceTplPicker from 'components/common/wizard/DeviceTplPicker'

class DeviceTplPickerContainer extends React.Component {
  render () {
    return (
      <DeviceTplPicker {...this.props}/>
    )
  }
}
export default connect(
  state => ({
    deviceTemplates: state.settings.deviceTemplates
  }), {
    fetchDeviceTemplates
  }
)(DeviceTplPickerContainer)
