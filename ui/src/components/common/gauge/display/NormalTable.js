import React from 'react'
import {Chip} from 'material-ui'
import {keys} from 'lodash'
import moment from 'moment'

import InfiniteTable from 'components/common/InfiniteTable'
import {renderEntity} from 'components/common/CellRenderers'
import {chipStyles} from 'style/common/materialStyles'

import { viewFilters } from 'shared/Global'

export default class NormalTable extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      total: 0
    }
    this.cells = [{
      'displayName': ' ',
      'columnName': 'entity.id',
      'customComponent': (p) => {
        const {viewFilter} = this.props
        const {rowData} = p
        const {entity} = rowData

        if (viewFilter === viewFilters.log.name) {
          if (!entity.dataobj) return <span/>
          return (
            <div style={chipStyles.wrapper}>
              {<div className="inline-block flex-1">{entity.dataobj.line}</div>}
              {entity.dataobj.file && <Chip style={chipStyles.smallChip} labelStyle={chipStyles.smallLabel}>{entity.dataobj.file}</Chip>}
            </div>
          )
        } else if (viewFilter === viewFilters.raw.name) {
          if (!entity.rawdata) return <span/>
          return (
            <div className="padding-sm bt-gray">{entity.rawdata}</div>
          )
        } else if (viewFilter === viewFilters.notNull.name) {

        }
        if (!entity) return <span/>

        const timeField = entity.startTimestamp ? 'startTimestamp' : 'timestamp'

        const {severity, ...others} = entity
        delete others[timeField]

        const data = {
          type: rowData.type,
          [timeField]: entity[timeField],
          severity,
          ...others
        }
        if (!severity) delete data.severity

        const {viewCols} = this.props
        if (viewCols.length > 0) {
          const remove = []
          keys(data).forEach(p => {
            if (viewCols.indexOf(p) < 0) remove.push(p)
          })
          remove.forEach(p => {
            delete data[p]
          })
        }

        const options = {
          notNull: viewFilter === viewFilters.notNull.name,
          timeField
        }
        return <div className="padding-sm bt-gray">{renderEntity(data, options)}</div>
      }
    }]
  }

  getCells () {
    if (this.props.viewMode === 'table') {
      const {viewCols} = this.props
      if (!viewCols || !viewCols.length) return null
      return viewCols.map(p => {
        const item = {
          'displayName': p,
          'columnName': `entity.${p}`
        }
        if (p === 'startTimestamp' || p === 'timestamp') {
          item.customComponent = k => <span>{moment(k.data).format('YYYY-MM-DD HH:mm:ss')}</span>
        }
        return item
      })
    } else {
      return this.cells
    }
  }

  render () {
    return (
      <div className="flex-1 table-no-gap">
        <InfiniteTable
          url="/search/all"
          cells={this.getCells()}
          ref="table"
          rowMetadata={{'key': 'id'}}
          params={this.props.params}
          showTableHeading={this.props.viewMode === 'table'}
        />
      </div>
    )
  }
}
