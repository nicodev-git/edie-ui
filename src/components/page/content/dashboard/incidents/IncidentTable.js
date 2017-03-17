import React, { Component } from 'react'
import Griddle from 'griddle-react'
import TimeAgo from 'react-timeago'
import moment from 'moment'
import IncidentEventsModal from './IncidentEventsModal'
import { iconStyle } from '../../../../../style/materialStyles'
import WarningIcon from 'material-ui/svg-icons/alert/warning'

import InfiniteTable from '../../../../shared/InfiniteTable'
/* import {
    getSeverityIcon
} from '../../../../../shared/Global' */

import {
  showIncidentRaw,
  showIncidentComments
} from '../../../../shared/incident/Incident'

import ReactTooltip from 'react-tooltip'

const thumbup = <img src="/images/ack.png" />
const thumpdown = <img src="/images/noack.png" />
const done = <img src="/images/ok.png" />
const clear = <img src="/images/notok.png" />
const rawtext = <img src="/images/rawtext.png" />
const reason = <img src="/images/reason.png" />

export default class IncidentTable extends Component {
  constructor (props) {
    super(props)
    this.state = {}

    this.cells = [{
      'displayName': 'Severity',
      'columnName': 'severity',
      'cssClassName': 'text-center width-80',
      'customComponent': (props) => {
        return <span><WarningIcon style={iconStyle} color="#ef9f15"/></span> // eslint-disable-line react/no-danger
      }
    }, {
      'displayName': 'Date/Time',
      'columnName': 'startTimestamp',
      'cssClassName': 'nowrap text-center width-180',
      'customComponent': (props) => {
        const {data} = props
        if (!data) return <span/>
        return (
                    <span data-tip={moment(new Date(data)).format('YYYY-MM-DD HH:mm:ss')}>
                        <TimeAgo date={data}/>
                    </span>
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
      'cssClassName': 'width-200',
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
                {row.fixed ? done : clear}
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

  refresh () {
    this.refs.table &&
        this.refs.table.refresh()
  }

  render2 () {
    return (
      <InfiniteTable
        url="/incidentstable/getLatestIncidentsDataTable?severity=High&severity=Medium"
        params={{}}
        cells={this.cells}
        ref="table"
        rowMetadata={{'key': 'incidentid'}}
        selectable
        bodyHeight={this.props.containerHeight}
        onRowDblClick={this.onRowDblClick.bind(this)}
      />
    )
  }

  reloadTable () {
    this.refresh()
  }

  onRowDblClick () {
    console.log(arguments)
  }

  renderIncidentEventsModal () {
    if (!this.props.incidentEventsModalOpen) return null
    return (
      <IncidentEventsModal {...this.props}/>
    )
  }

  render () {
    return (
      <div style={{width: '100%', height: '100%', padding: '0px', border: '0px', overflow: 'auto'}}>
        <Griddle
          id={this.props.id}

          enableSort={false}

          columns={this.cells.map(item => item.columnName)}
          columnMetadata={this.cells}

          tableClassName="table table-hover"

          useFixedHeader={false}
          noDataMessage=""
          useGriddleStyles={false}

          bodyHeight={this.props.containerHeight}
          rowMetadata={{'key': 'id'}}
          ref="table"
          results={this.props.incidents}
          resultsPerPage={100}
        />
        {this.renderIncidentEventsModal()}
      </div>
    )
  }
}

IncidentTable.defaultProps = {
  incidents: []
}
