import React, { Component } from 'react'
import TimeAgo from 'react-timeago'
import moment from 'moment'
import ReactTooltip from 'react-tooltip'

import { thumbup, thumpdown, done, notdone,
  rawtext, reason } from 'style/materialStyles'
import { getSeverityIcon } from 'shared/Global'
import {showIncidentRaw} from 'components/shared/incident/Incident'
import InfiniteTable from 'components/shared/InfiniteTable'
import {showPrompt} from 'components/shared/Alert'
import CommentsModal from 'components/shared/incident/CommentsModal'

export default class IncidentTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      commentModalVisible: false
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
              <TimeAgo date={data}/>
          </span>
        )
      }
    }, {
      'displayName': 'System',
      'columnName': 'devicename',
      'cssClassName': 'width-180'
    }, {
      'displayName': 'Workflow',
      'columnName': 'workflow',
      'cssClassName': 'width-180'
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
        setTimeout(() => {
          ReactTooltip.rebuild()
        }, 1)
        return (
          <div className = "table-icons-container">
            <div onClick={() => { this.props.ackIncident(row) }}>
              {row.acknowledged ? thumbup : thumpdown}
            </div>

            <div onClick={() => this.onClickFixIncident(row)}>
                {row.fixed ? done : notdone}
            </div>

            <div onClick={showIncidentRaw.bind(null, row)}>
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

  onClickFixIncident (incident) {
    showPrompt('Please type comment.', '', text => {
      if (!text) return

      const {userInfo} = this.props
      const user = userInfo ? userInfo.username : 'User'

      this.props.fixIncident(incident, user, text)
    })
  }

  showIncidentComments (incident) {
    this.setState({
      incident,
      commentModalVisible: true
    })
  }

  refresh () {
    this.refs.table &&
        this.refs.table.refresh()
  }

  reloadTable () {
    this.refresh()
  }

  onRowDblClick () {
    console.log(arguments)
  }

  render () {
    return (
      <div style={{position: 'absolute', width: '100%', top: 0, bottom: 0, overflow: 'auto'}}>
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
        />
        {this.state.commentModalVisible &&
        <CommentsModal
          incident={this.state.incident}
          updateDeviceIncident={this.props.updateDeviceIncident}
          onClose={() => {
            this.setState({commentModalVisible: false})
          }}/>}
      </div>
    )
  }
}
