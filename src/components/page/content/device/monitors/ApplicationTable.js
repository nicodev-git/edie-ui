import React, { Component } from 'react'

import InfiniteTable from 'components/shared/InfiniteTable'

export default class ApplicationTable extends Component {
  constructor (props) {
    super(props)

    this.columns = [{
      'displayName': 'Name',
      'columnName': 'dataobj.Name',
      'cssClassName': 'nowrap'
    }, {
      'displayName': 'InstallDate',
      'columnName': 'dataobj.InstallDate',
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
      'columnName': 'dataobj.Version',
      'cssClassName': 'width-120'
    }, {
      'displayName': 'Publisher',
      'columnName': 'dataobj.Publisher',
      'cssClassName': 'width-200'
    }, {
      'displayName': 'Size',
      'columnName': 'dataobj.Size',
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
