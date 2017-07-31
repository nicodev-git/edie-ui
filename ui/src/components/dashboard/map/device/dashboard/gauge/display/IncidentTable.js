import React from 'react'
import moment from 'moment'
import ReactTooltip from 'react-tooltip'

import InfiniteTable from 'components/common/InfiniteTable'
import { dateFormat, getSeverityIcon } from 'shared/Global'

export default class IncidentTable extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedSeverity: ['HIGH', 'MEDIUM'],

      selectedIndex: -1,
      fixed: 'false',
      text: '',
      afterStartTimestamp: moment().startOf('year').valueOf(),
      beforeStartTimestamp: moment().endOf('year').valueOf(),

      currentSortCol: 'startTimestamp',
      currentSortDir: 'desc',

      openExceptionModal: false,
      commentModalVisible: false,
      params: {},

      incident: null
    }
    this.cells = [{
      'displayName': 'Severity',
      'columnName': 'entity.severity',
      'cssClassName': 'text-center width-80',
      'customComponent': (props) => {
        return <span>{getSeverityIcon(props.data)}</span>
      }
    }, {
      'displayName': 'Date/Time',
      'columnName': 'entity.startTimestamp',
      'cssClassName': 'nowrap text-center width-180',
      'customComponent': (props) => {
        const {data} = props
        if (!data) return <span/>
        return (
          <span data-tip={moment(new Date(data)).format(dateFormat)}>
            {moment(new Date(data)).fromNow()}
          </span>
        )
      }
    }, {
      'displayName': 'System',
      'columnName': 'entity.devicename',
      'cssClassName': 'width-180'
    }, {
      'displayName': 'Workflow',
      'columnName': 'entity.workflow',
      'cssClassName': 'width-180'
    }, {
      'displayName': 'Description',
      'columnName': 'entity.description',
      'weight': 1
    }/*, {
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
    }*/]
  }
  onRowDblClick () {

  }

  getParams () {
    const { currentSortCol, currentSortDir, selectedSeverity, fixed, afterStartTimestamp, beforeStartTimestamp, text } = this.state

    let params = {
      draw: 1,
      description: text || '""',
      severity: selectedSeverity,
      afterStartTimestamp,
      beforeStartTimestamp,
      deviceid: this.props.device.id,
      sort: `${currentSortCol},${currentSortDir}`
    }
    if (fixed) params.fixed = fixed

    return params
  }

  render () {
    const {duration, durationUnit} = this.props

    const dateFrom = moment().add(-duration, `${durationUnit}s`).startOf(durationUnit).format(dateFormat)
    const dateTo = moment().endOf(durationUnit).format(dateFormat)

    return (
      <div className="flex-1 table-no-gap">
        <InfiniteTable
          cells={this.cells}
          ref="table"
          rowMetadata={{'key': 'id'}}
          selectable
          allowMultiSelect
          onRowDblClick={this.onRowDblClick.bind(this)}

          url="/incident/search/findBy"
          params={params}
        />
        <ReactTooltip />
      </div>
    )
  }
}
