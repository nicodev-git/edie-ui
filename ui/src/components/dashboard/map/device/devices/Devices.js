import React from 'react'
import InfiniteTable from 'components/common/InfiniteTable'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

export default class Devices extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: [{
        'displayName': 'Name',
        'columnName': 'name'
      }, {
        'displayName': 'LAN IP',
        'columnName': 'lanip'
      }, {
        'displayName': 'WAN IP',
        'columnName': 'wanip'
      }, {
        'displayName': 'Hostname',
        'columnName': 'hostname'
      }],

      data: [],
      selected: ''
    }
  }

  render () {
    return (
      <TabPage>
        <TabPageHeader title={this.props.device.name} />
        <TabPageBody>
          <InfiniteTable
            data={(this.props.device.group || {}).devices || []}
            className="tab-table"
            columns={this.state.columns}
            rowMetadata={{key: 'id'}}
            resultsPerPage={100}
            bodyHeight={500}
            useExternal={false}
          />
        </TabPageBody>
      </TabPage>
    )
  }
}
