import React from 'react'
import EventLogTable from '../../../../../components/page/content/device/monitors/EventLogTable'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchDeviceEventLog } from '../../../../../actions'

@connect(
  state => ({ eventLogs: state.devices.eventLogs }),
  dispatch => ({
    fetchDeviceEventLog: bindActionCreators(fetchDeviceEventLog, dispatch)
  })
)
export default class EventLogTableContainer extends React.Component {
  render () {
    return (
      <EventLogTable {...this.props} />
    )
  }
}

EventLogTable.defaultProps = {
  device: {}
}
