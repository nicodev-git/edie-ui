import React from 'react'
import TimeAgo from 'react-timeago'

import { ResponsiveInfiniteTable } from '../../../../shared/InfiniteTable'
import ProcessModal from './ProcessModal'
import { appendComponent, removeComponent } from '../../../../../util/Component'

export default class ProcessTable extends React.Component {
  constructor (props) {
    super(props)

    this.columns = [{
      'displayName': 'Name',
      'columnName': 'Name',
      'cssClassName': 'width-180'
    }, {
      'displayName': 'Id',
      'columnName': 'Id',
      'cssClassName': 'width-100'
    }, {
      'displayName': 'Owner',
      'columnName': 'Owner',
      'cssClassName': 'width-180'
    }, {
      'displayName': 'Parent',
      'columnName': 'Parent',
      'cssClassName': 'width-180'
    }, {
      'displayName': 'FilePath',
      'columnName': 'FilePath'
    }, {
      'displayName': 'Status',
      'columnName': 'Status',
      'cssClassName': 'width-120'
    }, {
      'displayName': 'LastSeen',
      'columnName': 'timestamp',
      'customComponent': (props) => {
        if (!props.data) return <span />

        return <TimeAgo date={props.data} />
      },
      'cssClassName': 'width-180'
    }]
  }

  componentWillMount () {
    this.props.fetchDeviceProcesses(this.props.device)
  }

  onRowDblClick () {
    const selected = this.refs.table.refs.wrappedInstance.getSelected()
    appendComponent(
      <ProcessModal process={selected} onClose={removeComponent}/>
    )
  }

  render () {
    return (
      <ResponsiveInfiniteTable
        cells={this.columns}
        ref="table"
        rowMetadata={{'key': 'id'}}
        selectable

        onRowDblClick={this.onRowDblClick.bind(this)}

        useExternal={false}
        data={this.props.processes}
      />
    )
  }
}

ProcessTable.defaultProps = {
  device: {}
}
