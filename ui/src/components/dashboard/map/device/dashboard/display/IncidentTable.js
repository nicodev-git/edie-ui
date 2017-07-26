import React from 'react'
import moment from 'moment'

import InfiniteTable from 'components/common/InfiniteTable'
import {renderEntity} from 'components/common/CellRenderers'
import { dateFormat } from 'shared/Global'

export default class IncidentTable extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      total: 0
    }
    this.cells = [{
      'displayName': ' ',
      'columnName': 'entity.id',
      'customComponent': (p) => {
        const {rowData} = p
        const {entity} = rowData

        if (!entity) return <span/>
        const highlighted = { ...entity }

        const timeField = entity.startTimestamp ? 'startTimestamp' : 'timestamp'
        delete highlighted[timeField]

        const {severity, ...others} = highlighted
        const data = {
          type: rowData.type,
          [timeField]: moment(entity[timeField]).fromNow(),
          severity,
          ...others
        }
        if (!severity) delete data.severity
        return <div className="padding-sm bt-gray">{renderEntity(data)}</div>
      }
    }]
  }

  render () {
    const {duration, durationUnit} = this.props

    const dateFrom = moment().add(-duration, `${durationUnit}s`).startOf(durationUnit).format(dateFormat)
    const dateTo = moment().endOf(durationUnit).format(dateFormat)

    return (
      <div className="flex-1 table-no-gap">
        <InfiniteTable
          url="/search/all"
          cells={this.cells}
          ref="table"
          rowMetadata={{'key': 'id'}}
          params={{...this.props.params, dateFrom, dateTo}}
          showTableHeading={false}
        />
      </div>
    )
  }
}
