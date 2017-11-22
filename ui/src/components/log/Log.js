import React from 'react'
import moment from 'moment'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import {getRanges} from 'components/common/DateRangePicker'
import LogPapers from 'components/dashboard/log/LogPapers'

const ranges = getRanges()
const from = ranges['Ever'][0].valueOf()
const to = ranges['Ever'][1].valueOf()

export default class Log extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      monitorUid: ''
    }
  }
  componentWillMount () {
    this.props.fetchDevicesGroups()
  }
  getLogMonitors () {
    const {allDevices} = this.props
    const monitors = []
    allDevices.forEach(p => {
      if (!p.monitors) return
      p.monitors.forEach(m => {
        if (m.monitortype === 'logfile') monitors.push(m)
      })
    })

    return monitors
  }

  onClickMonitor (monitor) {
    this.setState({
      monitorUid: monitor.uid
    })
  }

  getParams () {
    const {monitorUid} = this.state

    const queries = []
    queries.push(`(monitorid:${monitorUid})`)

    return {
      q: queries.join(' AND '),
      from,
      to,
      types: 'event'
    }
  }

  onClickDetailView () {

  }

  onResultCountUpdate () {

  }

  ///////////////////////////////////////////////////////////////////////////////////

  renderMonitorList (monitors) {
    return (
      <div>
        {monitors.map(m => {
          let time = ''
          if (m.lastsuccess) {
            time = moment(m.lastsuccess).fromNow().replace(' ago', '')
          }
          return (
            <div key={m.uid} className="padding-sm bt-gray">
              <span className="link" onClick={this.onClickMonitor.bind(this, m)}>
                {m.name}{time ? ` (${time})` : ''}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  renderLogs () {
    const {monitorUid} = this.state
    if (!monitorUid) return <div/>
    return (
      <div className="flex-1 flex-vertical">
        <LogPapers
          url="/search/query"
          ref="table"
          rowMetadata={{'key': 'id'}}
          params={this.getParams()}
          pageSize={1000}
          revertRows
          onClickView={this.onClickDetailView.bind(this)}
          onUpdateCount={this.onResultCountUpdate.bind(this)}
          hideHeader
        />
      </div>
    )
  }

  render () {
    const monitors = this.getLogMonitors()
    return (
      <TabPage>
        <div className="padding-md">
          <span className="tab-title">Logs</span>
        </div>

        <TabPageBody tabs={[]} history={this.props.history} location={this.props.location}>
          <div className="flex-horizontal" style={{height: '100%'}}>
            <div style={{minWidth: 200}}>
              <div className="header-blue">Log</div>
              {this.renderMonitorList(monitors)}
            </div>
            <div>
              &nbsp;&nbsp;
            </div>
            <div className="flex-vertical flex-1">
              <div className="header-red">Content</div>
              {this.renderLogs()}
            </div>
          </div>
        </TabPageBody>
      </TabPage>
    )
  }
}
