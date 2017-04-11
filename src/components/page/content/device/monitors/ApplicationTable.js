import React, { Component } from 'react'

import InfiniteTable from '../../../../shared/InfiniteTable'

export default class ApplicationTable extends Component {
  constructor (props) {
    super(props)

    this.columns = [{
      'displayName': 'Name',
      'columnName': 'agentdata.Name',
      'cssClassName': 'nowrap'
    }, {
      'displayName': 'InstallDate',
      'columnName': 'agentdata.InstallDate',
      'cssClassName': 'width-140',
      'customComponent': (props) => {
        let val = props.data
        if (!val) return <span />
        val = `${val.substring(0, 4)}-${
                    val.substring(4, 6)}-${
                    val.substring(6)}`

        return <span>{val}</span>
      }
    }, {
      'displayName': 'Version',
      'columnName': 'agentdata.Version',
      'cssClassName': 'width-120'
    }, {
      'displayName': 'Publisher',
      'columnName': 'agentdata.Publisher',
      'cssClassName': 'width-200'
    }, {
      'displayName': 'Size',
      'columnName': 'agentdata.Size',
      'cssClassName': 'width-120'
    }]
  }

  render () {
    return (
      <InfiniteTable
        cells={this.columns}
        ref="table"
        rowMetadata={{'key': 'id'}}
        rowHeight={38}
        selectable

        url="/event/search/findAgentEvents"
        params={{
          deviceid: this.props.device.id,
          eventType: 'AGENT',
          monitortype: 'app',
          sort: 'timestamp,desc'
        }}
      />
    )
  }
}
