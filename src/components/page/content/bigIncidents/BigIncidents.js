import React, { Component } from 'react'
import moment from 'moment'
import { assign } from 'lodash'
import TimeAgo from 'react-timeago'

import IncidentEventsModal from 'components/page/content/dashboard/incidents/IncidentEventsModal'
import { thumbup, thumpdown, done, notdone, rawtext, reason } from 'style/materialStyles'
import { getSeverityIcon } from 'shared/Global'
import { showIncidentRaw, showIncidentComments } from 'components/shared/incident/Incident'
import ReactTooltip from 'react-tooltip'

import BigIncidentsView from '../../../modal/BigIncidentsView'

import { ResponsiveInfiniteTable } from 'components/shared/InfiniteTable'

const severities = [
  { label: 'High', value: 'HIGH' },
  { label: 'Medium', value: 'MEDIUM' },
  { label: 'Low', value: 'LOW' },
  { label: 'Audit', value: 'AUDIT' },
  { label: 'Ignore', value: 'IGNORE' }
]

class BigIncidents extends Component {
  constructor (props) {
    super(props)
    this.cells = [{
      'displayName': 'Severity',
      'columnName': 'severity',
      'cssClassName': 'text-center width-80',
      'customComponent': (props) => {
        return <span>{getSeverityIcon(props.data)}</span>
      }
    }, {
      'displayName': 'Date/Time',
      'columnName': 'startTimestamp',
      'cssClassName': 'nowrap text-center width-180',
      'customComponent': (props) => {
        const {data} = props
        if (!data) return <span/>
        return (
          <span data-tip={moment(new Date(data)).format('YYYY-MM-DD HH:mm:ss')}><TimeAgo date={data}/></span>
        )
      }
    }, {
      'displayName': 'System',
      'columnName': 'devicename',
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

            <div onClick={() => { this.props.fixIncident(row) }}>
              {row.fixed ? done : notdone}
            </div>

            <div onClick={showIncidentRaw.bind(null, row)}>
              {rawtext}
            </div>

            {
              (row.fixed && !row.whathappened)
                ? <div
                  onClick={showIncidentComments.bind(null, this.context.sid, row, this.reloadTable.bind(this))}>
                  {reason}
                </div>
                : null
            }

          </div>
        )
      }
    }]
  }

  componentWillMount () {
    this.props.updateBigIncidentParams({
      draw: 1,
      deviceid: '*',
      description: '',
      fixed: null,
      severity: ['HIGH', 'MEDIUM'],
      afterStartTimestamp: moment().add(-6, 'days').valueOf(),
      beforeStartTimestamp: moment().valueOf(),
      sort: 'startTimestamp,desc'
    })
  }

  reloadTable () {
    this.props.updateBigIncidentParams(assign({}, this.props.bigIncidentParams, {
      draw: this.props.bigIncidentParams.draw + 1
    }))
  }

  renderIncidentEventsModal () {
    if (!this.props.incidentEventsModalOpen) return null
    return (
      <IncidentEventsModal {...this.props}/>
    )
  }

  renderTable () {
    return (
      <ResponsiveInfiniteTable
        cells={this.cells}
        ref="table"
        rowMetadata={{'key': 'id'}}
        selectable

        url="/incident/search/findBy"
        params={this.props.bigIncidentParams}
      />
    )
  }

  onHide () {
    this.props.router.goBack()
  }

  onChangeSeverity (selected) {
    this.props.updateBigIncidentParams(assign({}, this.props.bigIncidentParams, {
      severity: selected.map(item => item.value)
    }))
  }

  onChangeDateRange ({startDate, endDate}) {
    this.props.updateBigIncidentParams(assign({}, this.props.bigIncidentParams, {
      afterStartTimestamp: startDate.valueOf(),
      beforeStartTimestamp: endDate.valueOf()
    }))
  }

  onChangeFixedStatus (e) {
    this.props.updateBigIncidentParams(assign({}, this.props.bigIncidentParams, {
      fixed: e.target.value || null
    }))
  }

  onChangeKeyword (e) {
    this.props.updateBigIncidentParams(assign({}, this.props.bigIncidentParams, {
      description: e.target.value
    }))
  }

  render () {
    const { bigIncidentParams } = this.props
    if (!bigIncidentParams) return null

    return (
      <BigIncidentsView
        onHide={this.onHide.bind(this)}
        severities={bigIncidentParams.severity.join(',')}
        severityOptions={severities}
        onChangeSeverity={this.onChangeSeverity.bind(this)}

        startDate={moment(bigIncidentParams.afterStartTimestamp)}
        endDate={moment(bigIncidentParams.beforeStartTimestamp)}
        onChangeDateRange={this.onChangeDateRange.bind(this)}

        fixedStatus={bigIncidentParams.fixed}
        onChangeFixedStatus={this.onChangeFixedStatus.bind(this)}

        keyword={bigIncidentParams.description}
        onChangeKeyword={this.onChangeKeyword.bind(this)}

        table={this.renderTable()}
        eventsModal={this.renderIncidentEventsModal()}
      />
    )
  }
}

export default BigIncidents
