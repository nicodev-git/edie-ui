import React, { Component } from 'react'
import moment from 'moment'
import ReactTooltip from 'react-tooltip'

import { thumbup, thumpdown, done, notdone,
  rawtext, reason } from 'style/common/materialStyles'
import { getSeverityIcon } from 'shared/Global'
import {showIncidentRaw} from 'components/common/incident/Incident'
import InfiniteTable from 'components/common/InfiniteTable'
import {showPrompt} from 'components/common/Alert'
import CommentsModal from 'components/common/incident/CommentsModal'
import {getRanges} from 'components/common/DateRangePicker'

export default class IncidentTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sunVisible: false
    }

    this.cells = [{
      'displayName': 'Severity',
      'columnName': 'severity',
      'cssClassName': 'text-center width-80',
      'customComponent': (props) => {
        return <span>{getSeverityIcon(props.data)}</span> // eslint-disable-line react/no-danger
      }
    }, {
      'displayName': 'Date/Time',
      'columnName': 'startTimestamp',
      'cssClassName': 'nowrap text-center width-180',
      'customComponent': (props) => {
        const {data} = props
        if (!data) return <span/>
        if (this.props.showAbsDate) return <span>{moment(new Date(data)).format(this.props.dateFormat)}</span>
        return (
          <span data-tip={moment(new Date(data)).format(this.props.dateFormat)}>
            {moment(new Date(data)).fromNow()}
          </span>
        )
      }
    }, {
      'displayName': 'System',
      'columnName': 'devicename',
      'cssClassName': 'width-200',
      'customComponent': p => {
        const {workflow} = p.rowData
        return <span>{p.data}{workflow ? `(${workflow})` : ''}</span>
      }
    }, {
      'displayName': 'Description',
      'columnName': 'description',
      'weight': 1
    }, {
      'displayName': 'Actions',
      'columnName': 'actions',
      'cssClassName': 'width-180',
      'customComponent': (p) => {
        const row = p.rowData
        // setTimeout(() => {
        //   ReactTooltip.rebuild()
        // }, 1)
        return (
          <div className = "table-icons-container">
            <div onClick={() => { this.props.ackIncident(row) }}>
              {row.acknowledged ? thumbup : thumpdown}
            </div>

            <div onClick={() => this.onClickFixIncident(row)}>
                {row.fixed ? done : notdone}
            </div>

            <div onClick={this.onClickViewRaw.bind(this, row)}>
                {rawtext}
            </div>

            {
              (row.fixed && !row.whathappened)
                ? <div
                  onClick={this.showIncidentComments.bind(this, row)}>
                  {reason}
                </div>
                : null
            }

          </div>
        )
      }
    }]
  }

  findLogFile (events) {
    const found = (events || []).filter(p => p.monitortype === 'logfile')
    return found
  }

  onClickFixIncident (incident) {
    showPrompt('Please type comment.', '', text => {
      if (!text) return

      const {userInfo, newIncidentMsg} = this.props
      const user = userInfo ? userInfo.username : 'User'

      this.props.fixIncident(incident, user, text)
      if (newIncidentMsg && newIncidentMsg.incident.id === incident.id) {
        this.props.updateNewIncidentMsg(null)
      }
    })
  }

  showIncidentComments (incident) {
    this.props.showCommentsModal(true, incident)
  }

  onRowDblClick () {
  }

  onClickViewRaw (row) {
    const logEvents = this.findLogFile(row.events)
    if (logEvents.length) {
      const ranges = getRanges()
      const q = `(monitorid:${logEvents[0].monitorid})`

      this.props.updateViewLogParams({
        q,
        types: 'event',
        from: ranges['Ever'][0].valueOf(),
        to: ranges['Ever'][1].valueOf(),
      }, this.props.history, true)

      const params = {
        q,
        from: 0,
        to: logEvents[0].timestamp,
        page: 0,
        size: 100,
        types: 'event',
        rowId: logEvents[0].id
      }
      this.props.showDetailLogModal(true, params)
      return
    }
    showIncidentRaw(row)
  }

  renderSun () {
    if (!this.state.sunVisible) return null
    return (
      <div className="text-center div-sun" style={{}}>
        <div className="bg"/>
        You have no incidents.<br/>
        Please enjoy your day!
      </div>
    )
  }

  onUpdateCount (total, data, init) {
    if (!init) {
      const {onUpdateIncidentCount} = this.props

      this.setState({sunVisible: !total})

      onUpdateIncidentCount && onUpdateIncidentCount(total)
    }
  }

  render () {
    return (
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, overflow: 'auto'}}>
        <InfiniteTable
          url="/incident/search/findBySeverity"
          cells={this.cells}
          ref="table"
          rowMetadata={{'key': 'id'}}
          selectable
          onRowDblClick={this.onRowDblClick.bind(this)}
          params={{
            draw: this.props.mainIncidentDraw,
            severity: ['HIGH', 'MEDIUM'],
            sort: 'startTimestamp,desc'
          }}
          onUpdateCount={this.onUpdateCount.bind(this)}
        />
        {
          this.props.commentsModalVisible &&
          <CommentsModal
            incident={this.props.commentsIncident}
            updateDeviceIncident={this.props.updateDeviceIncident}
            onClose={() => this.props.showCommentsModal(false)}/>
        }
        {this.renderSun()}
        <ReactTooltip/>
      </div>
    )
  }
}
