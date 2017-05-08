import React, { Component } from 'react'
import {TextField, FlatButton} from 'material-ui'
import ActionSearch from 'material-ui/svg-icons/action/search'
import moment from 'moment'
import {assign} from 'lodash'

import InfiniteTable from 'components/shared/InfiniteTable'

import TabPage from 'components/shared/TabPage'
import TabPageBody from 'components/shared/TabPageBody'
import TabPageHeader from 'components/shared/TabPageHeader'
import MonitorTabs from './MonitorTabs'
import StatusImg from './StatusImg'
import MonitorSocket from 'util/socket/MonitorSocket'

import { parseSearchQuery } from 'shared/Global'

export default class EventLogTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      query: ''
    }
    this.columns = [{
      'displayName': 'Time',
      'columnName': 'LogTime',
      'cssClassName': 'nowrap width-140'
    }, {
      'displayName': 'LogName',
      'columnName': 'LogName',
      'cssClassName': 'width-100'
    }, {
      'displayName': 'EventID',
      'columnName': 'EventID',
      'cssClassName': 'width-80'
    }, {
      'displayName': 'User',
      'columnName': 'User',
      'cssClassName': 'width-160'
    }, {
      'displayName': 'Data',
      'columnName': 'Data'
    }]
  }
  componentWillMount () {
    this.props.clearMonitors()
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
      monitors: 'eventlog',
      deviceId: this.props.device.id
    })
  }
  onMonitorMessage (msg) {
    console.log(msg)
    if (msg.action === 'update' && msg.deviceId === this.props.device.id) {
      this.props.updateMonitorRealTime(msg.data)
    }
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
    const query = `deviceid=${this.props.device.id} and monitortype=log and eventType=AGENT and _all=${this.state.query}`
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
  renderBody2 () {
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
  renderBody () {
    return (
      <InfiniteTable
        cells={this.columns}
        ref="table"
        rowMetadata={{'key': 'id'}}
        selectable
        data={this.props.eventLogs}
        useExternal={false}
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
          <div className="flex-vertical" style={{height: '100%'}}>
            <div className="padding-md">
              <StatusImg {...this.props}/>
            </div>
            <div className="flex-1">
              {this.renderBody()}
            </div>
          </div>
        </TabPageBody>
      </TabPage>
    )
  }
}
