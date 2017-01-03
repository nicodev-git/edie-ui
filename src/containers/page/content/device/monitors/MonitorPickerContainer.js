import React from 'react'
import MonitorPicker from '../../../../../components/page/content/device/monitors/MonitorPicker'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { closeDeviceMonitorPicker, fetchMonitorTemplates } from '../../../../../actions'

@connect(
  state => ({ monitorTemplates: state.settings.monitorTemplates }),
  dispatch => ({
    ...bindActionCreators({
      fetchMonitorTemplates,
      closeDeviceMonitorPicker
    }, dispatch)
  })
)
export default class MonitorPicker extends React.Component {
  render () {
    return (
      <MonitorPicker {...this.props} />
    )
  }
}

MonitorPicker.defaultProps = {
  onClose: null,
  onClickItem: null
}
