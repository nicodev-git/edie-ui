import React from 'react'
import {RaisedButton, TextField, FlatButton} from 'material-ui'
import ActionSearch from 'material-ui/svg-icons/action/search'
import moment from 'moment'
import { assign } from 'lodash'

import MonitorTable from './MonitorTable'
import DiskTable from './DiskTable'
import CpuTable from './CpuTable'
import MemoryTable from './MemoryTable'

import TabPage from 'components/shared/TabPage'
import TabPageBody from 'components/shared/TabPageBody'
import TabPageHeader from 'components/shared/TabPageHeader'
import MonitorTabs from './MonitorTabs'
import StatusImg from './StatusImg'

import { parseSearchQuery } from 'shared/Global'

export default class Monitors extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      query: ''
    }
  }
  componentWillMount () {
    this.props.clearMonitors()
  }

  getMonitorTable () {
    return this.refs.monitor
  }

  onClickAddMonitor () {
    this.getMonitorTable().onClickAddMonitor()
  }

  onClickEditMonitor () {
    this.getMonitorTable().onClickEditMonitor()
  }

  onClickDeleteMonitor () {
    this.getMonitorTable().onClickDeleteMonitor()
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
    const {selected} = this.state
    let monitortype = ''
    if (selected === 'eventlog') monitortype = 'log'
    else if (selected === 'process') monitortype = 'process'
    else if (selected === 'application') monitortype = 'app'
    console.log(this.props.params)

    const query = `deviceid=${this.props.device.id} and monitortype=${monitortype} and eventType=AGENT and _all=${this.state.query}`
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
  renderSearch () {
    const {selected, query} = this.state
    return (
      <div className={`inline-block ${selected === 'monitors' ? 'hidden' : ''}`}>
        <TextField name="query" value={query} onChange={this.onChangeQuery.bind(this)} onKeyUp={this.onKeyupQuery.bind(this)}/>
        <FlatButton icon={<ActionSearch />} onTouchTap={this.onClickSearch.bind(this)}/>
      </div>
    )
  }
  renderOptions () {
    return (
      <div className="text-center">
        <div style={{position: 'absolute', right: '25px'}}>
          <RaisedButton label="Add" onTouchTap={this.onClickAddMonitor.bind(this)}/>&nbsp;
          <RaisedButton label="Edit" onTouchTap={this.onClickEditMonitor.bind(this)}/>&nbsp;
          <RaisedButton label="Delete" onTouchTap={this.onClickDeleteMonitor.bind(this)}/>&nbsp;
        </div>
        &nbsp;
      </div>
    )
  }
  renderOSInfo () {
    const {monitorOS, monitorCpu} = this.props
    const texts = []
    if (monitorOS) {
      texts.push(`${monitorOS.dataobj.Name} ${monitorOS.dataobj.ServicePack}`)
    }
    if (monitorCpu) {
      const cpus = monitorCpu.dataobj
      const list = cpus.length ? cpus : [cpus]
      list.forEach(c => {
        texts.push(`${c.Model}`)
      })
    }
    return (
      <div className="v-centered text-left" style={{fontSize: '11px', paddingLeft: '10px'}}>
        {texts.map((t, i) =>
          <div key={i}>{t}</div>
        )}
      </div>
    )
  }

  renderBody () {
    const {props} = this

    return (
      <div className="flex-vertical" style={{height: '100%'}}>
        <div className="padding-sm text-center" style={{position: 'relative'}}>
          {this.renderOSInfo()}
          <CpuTable {...this.props}/>
          <MemoryTable {...this.props}/>
          <DiskTable {...this.props}/>
        </div>
        <div className="flex-1 flex-vertical" style={{background: 'white'}}>
          <MonitorTable {...props} ref="monitor"/>
        </div>
      </div>
    )
  }
  render () {
    const {props} = this
    const {device} = props
    return (
      <TabPage>
        <TabPageHeader title="Monitors" titleOptions={<StatusImg {...this.props}/>}>
          {this.renderOptions()}
        </TabPageHeader>
        <TabPageBody tabs={MonitorTabs(device.id)}>
          {this.renderBody()}
        </TabPageBody>
      </TabPage>
    )
  }
}
