import React, { Component } from 'react'
import { ResponsiveInfiniteTable } from '../../../../shared/InfiniteTable'

export default class EventLogTable extends Component {
  constructor (props) {
    super(props)
    this.columns = [{
      'displayName': 'Time',
      'columnName': 'agentdata.LogTime',
      'cssClassName': 'nowrap width-140'
    }, {
      'displayName': 'LogName',
      'columnName': 'agentdata.LogName',
      'cssClassName': 'width-100'
    }, {
      'displayName': 'EventID',
      'columnName': 'agentdata.EventID',
      'cssClassName': 'width-80'
    }, {
      'displayName': 'User',
      'columnName': 'agentdata.User',
      'cssClassName': 'width-160'
    }, {
      'displayName': 'Data',
      'columnName': 'agentdata.Data'
    }]
  }

  render () {
    return (
      <ResponsiveInfiniteTable
        cells={this.columns}
        ref="table"
        rowMetadata={{'key': 'id'}}
        rowHeight={400}
        selectable
        url="/event/search/findAgentEvents"
        params={{
          deviceid: this.props.device.id,
          eventType: 'AGENT',
          monitortype: 'log',
          sort: 'timestamp,desc'
        }}
        data={this.props.eventLogs}
      />
    )
  }
}
