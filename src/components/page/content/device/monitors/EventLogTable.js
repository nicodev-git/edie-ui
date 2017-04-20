import React, { Component } from 'react'
import InfiniteTable from '../../../../shared/InfiniteTable'

export default class EventLogTable extends Component {
  constructor (props) {
    super(props)
    this.columns = [{
      'displayName': 'Time',
      'columnName': 'dataobj.LogTime',
      'cssClassName': 'nowrap width-140'
    }, {
      'displayName': 'LogName',
      'columnName': 'dataobj.LogName',
      'cssClassName': 'width-100'
    }, {
      'displayName': 'EventID',
      'columnName': 'dataobj.EventID',
      'cssClassName': 'width-80'
    }, {
      'displayName': 'User',
      'columnName': 'dataobj.User',
      'cssClassName': 'width-160'
    }, {
      'displayName': 'Data',
      'columnName': 'dataobj.Data'
    }]
  }

  render () {
    return (
      <InfiniteTable
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
      />
    )
  }
}
