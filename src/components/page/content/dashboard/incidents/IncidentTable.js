import React, { Component } from 'react'
import Griddle from 'griddle-react'
import TimeAgo from 'react-timeago'
import moment from 'moment'

import InfiniteTable from '../../../../shared/InfiniteTable'
import {
    getSeverityIcon
} from '../../../../../shared/Global'

import {
    showIncidentRaw,
    showIncidentComments
} from '../../../../shared/incident/Incident'

import ReactTooltip from 'react-tooltip'

export default class IncidentTable extends Component {
  constructor (props) {
    super(props)
    this.state = {}

    this.cells = [{
      'displayName': 'Severity',
      'columnName': 'severity',
      'cssClassName': 'text-center width-60',
      'customComponent': (props) => {
        return <span dangerouslySetInnerHTML={{__html: getSeverityIcon(props.data)}}/> // eslint-disable-line react/no-danger
      }
    }, {
      'displayName': 'Date/Time',
      'columnName': 'startTimestamp',
      'cssClassName': 'nowrap text-center width-140',
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
      'cssClassName': 'width-140'
    }, {
      'displayName': 'Description',
      'columnName': 'description',
      'weight': 1
    }, {
      'displayName': 'Actions',
      'columnName': 'actions',
      'cssClassName': 'width-160',
      'customComponent': (p) => {
        const row = p.rowData
        setTimeout(() => {
          ReactTooltip.rebuild()
        }, 1)
        return (
          <div>
            <a href="javascript:;" onClick={() => { this.props.ackIncident(row) }}>
                <img style={{height: '30px'}} title="Acknowledge"
                  src={`/images/${row.acknowledged ? 'ack.png' : 'noack.png'}`} />
            </a>
            &nbsp;

            <a href="javascript:;" onClick={() => { this.props.fixIncident(row) }}>
                <img style={{height: '30px'}} title="Acknowledge"
                  src={`/images/${row.fixed ? 'ok.png' : 'notok.png'}`} />
            </a>
            &nbsp;

            <a href="javascript:;" onClick={showIncidentRaw.bind(null, row)}>
                <img style={{height: '34px'}} title="Raw" src="/images/rawtext.png"/>
            </a>
            &nbsp;

            {
              (row.fixed && !row.whathappened)
                ? <a href="javascript:;"
                  onClick={showIncidentComments.bind(null, this.context.sid, row, this.reloadTable.bind(this))}>
                  <img style={{height: '25px'}} title="Reason"
                    src={`/images/${row.lastcomment ? 'reason-icon.png' : 'reason-x.png'}`} />
                  </a>
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
      </div>
    )
  }
}

IncidentTable.defaultProps = {
  incidents: []
}
