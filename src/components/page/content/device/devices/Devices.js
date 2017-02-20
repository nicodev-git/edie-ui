import React from 'react'
import Griddle from 'griddle-react'

import TabPage from 'components/shared/TabPage'
import TabPageBody from 'components/shared/TabPageBody'
import TabPageHeader from 'components/shared/TabPageHeader'

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
          <Griddle
            results={(this.props.device.group || {}).devices || []}
            tableClassName="table tab-table"
            showFilter={false}
            showSettings={false}
            columns={this.state.columns.map(item => item.columnName)}
            columnMetadata={this.state.columns}
            rowMetadata={{key: 'id'}}
            useGriddleStyles={false}
            resultsPerPage={100}
            bodyHeight={500}
          />
        </TabPageBody>
      </TabPage>
    )
  }
}
