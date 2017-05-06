import React from 'react'
import {TextField, FlatButton} from 'material-ui'
import ActionSearch from 'material-ui/svg-icons/action/search'
import moment from 'moment'
import {assign} from 'lodash'

import InfiniteTable from 'components/shared/InfiniteTable'

import TabPage from 'components/shared/TabPage'
import TabPageBody from 'components/shared/TabPageBody'
import TabPageHeader from 'components/shared/TabPageHeader'
import MonitorTabs from './MonitorTabs'
import MonitorSocket from 'util/socket/MonitorSocket'

import { parseSearchQuery } from 'shared/Global'

export default class ProcessTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      query: ''
    }
    this.columns = [{
      'displayName': 'Name',
      'columnName': 'Name',
      'cssClassName': 'width-180'
    }, {
      'displayName': 'Id',
      'columnName': 'Id',
      'cssClassName': 'width-80'
    }, {
      'displayName': 'Owner',
      'columnName': 'Owner',
      'cssClassName': 'width-220'
    }, {
      'displayName': 'Parent',
      'columnName': 'Parent',
      'cssClassName': 'width-120'
    }, {
      'displayName': 'Location',
      'columnName': 'Location'
    }, {
      'displayName': 'Status',
      'columnName': 'Status',
      'cssClassName': 'width-100'
    }, {
      'displayName': 'LastSeen',
      'columnName': 'timestamp',
      'customComponent': (props) => {
        if (!props.data) return <span />

        return <span>{moment(props.data).fromNow()}</span>
      },
      'cssClassName': 'width-160'
    }]
  }

  componentDidMount () {
    this.monitorSocket = new MonitorSocket({
      listener: this.onMonitorMessage.bind(this)
    })
    this.monitorSocket.connect(this.onSocketOpen.bind(this))
  }

  componentWillUnmount () {
    this.monitorSocket.close()
  }

  onSocketOpen () {
    this.monitorSocket.send({
      action: 'enable-realtime',
      monitors: 'process',
      deviceId: this.props.device.id
    })
  }
  onMonitorMessage (msg) {
    console.log(msg)
    if (msg.action === 'update' && msg.deviceId === this.props.device.id) {
      this.props.updateMonitorRealTime(msg.data)
    }
  }

  onRowDblClick () {
    const selected = this.refs.table.getSelected()
    this.props.openProcessModal(selected)
  }
  onChangeQuery (e) {
    this.setState({
      query: e.target.value
    })
  }
  onKeyupQuery (e) {
    if (e.keyCode === 13) {
      this.onClickSearch()
    }
  }
  onClickSearch () {
    const query = `deviceid=${this.props.device.id} and monitortype=process and eventType=AGENT and _all=${this.state.query}`
    const queryChips = parseSearchQuery(query)

    this.props.router.push('/search')
    this.props.updateSearchParams(assign({}, this.props.params, {
      query,
      severity: 'HIGH,MEDIUM',
      collections: 'event',
      workflow: '',
      dateFrom: moment().startOf('year').valueOf(),
      dateTo: moment().endOf('year').valueOf()
    }))

    this.props.replaceSearchWfs([])
    this.props.updateQueryChips(queryChips)
  }
  renderOptions () {
    const {query} = this.state
    return (
      <div className="text-center">
        <div className="inline-block">
          <TextField name="query" value={query} onChange={this.onChangeQuery.bind(this)} onKeyUp={this.onKeyupQuery.bind(this)}/>
          <FlatButton icon={<ActionSearch />} onTouchTap={this.onClickSearch.bind(this)}/>
        </div>
      </div>
    )
  }
  renderBody () {
    return (
      <InfiniteTable
        cells={this.columns}
        ref="table"
        rowMetadata={{'key': 'Id'}}
        selectable
        rowHeight={40}
        onRowDblClick={this.onRowDblClick.bind(this)}

        useExternal={false}
        data={this.props.processes}
      />
    )
  }
  render () {
    const {device} = this.props
    return (
      <TabPage>
        <TabPageHeader title={device.name}>
          {this.renderOptions()}
        </TabPageHeader>
        <TabPageBody tabs={MonitorTabs(device.id)}>
          {this.renderBody()}
        </TabPageBody>
      </TabPage>
    )
  }
}

ProcessTable.defaultProps = {
  device: {}
}
