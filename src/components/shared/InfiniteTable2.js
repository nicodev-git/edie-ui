import React from 'react'
import GriddleWithCallback from './GriddleWithCallback'

import { ROOT_URL } from '../../actions/config'

class InfiniteTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      'draw': 1,

      defaultRowMetaData: {
        'bodyCssClassName': this.getBodyCssClassName.bind(this)
      },

      selected: []
    }

    this.getExternalResults = this.getExternalResults.bind(this)
  }

  getExternalResults (filterString, sortColumn, sortAscending, page, pageSize, callback) {
    let currentDraw = this.state.draw
    let url = this.props.url
    let params = this.props.params || {}
    page = Math.max(page, 0)
    pageSize = Math.max(pageSize, 10)

    let urlParams = $.extend({}, params, {
      draw: currentDraw,
      start: pageSize * page,
      length: pageSize
    })

    $.get(`${ROOT_URL}${url}`, urlParams).done(res => {
      callback({
        results: res.data,
        totalResults: res.recordsTotal,
        pageSize: pageSize
      })
    })
  }

  onRowClick (row) {
    if (!this.props.selectable) return
    this.setState({
      selected: [row.props.data[this.props.rowMetadata.key]]
    })
  }

  getBodyCssClassName (data) {
    if (!this.props.selectable) return ''
    if (this.state.selected.indexOf(data[this.props.rowMetadata.key]) >= 0) return 'selected'
    return ''
  }

  getSelected () {
    let found = null
    this.refs.table.state.results.forEach(item => {
      if (this.state.selected.indexOf(item[this.props.rowMetadata.key]) >= 0) {
        found = item
        return false
      }
    })
    return found
  }

  getTotalResults () {
    return this.refs.table.getTotalResults()
  }

  refresh () {
    const table = this.refs.table
    table.setPage(table.state.page || 0,
            table.state.pageSize || this.props.pageSize)
  }

  render () {
    let rowMetadata = Object.assign({}
            , this.state.defaultRowMetaData
            , this.props.rowMetadata || {})

    return (
            <GriddleWithCallback
              showFilter={false}
              enableSort={false}
              columns={this.props.cells.map(item => item.columnName)}
              columnMetadata={this.props.cells}
              rowMetadata={rowMetadata}
              getExternalResults={this.getExternalResults}
              resultsPerPage={this.props.pageSize}
              loadingComponent={() => <div>Loading...</div>}
              enableInfiniteScroll
              useFixedHeader={false}
              noDataMessage=""
              bodyHeight={this.props.bodyHeight}
              useGriddleStyles={false}
              onRowClick={this.onRowClick.bind(this)}
              ref="table"/>
    )
  }
}

InfiniteTable.defaultProps = {
  url: '',
  params: '',
  cells: [],

  pageSize: 50,
  rowMetadata: [],
  bodyHeight: 100,

  selectable: false
}

export default InfiniteTable
