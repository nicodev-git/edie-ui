import React from 'react'
import ReactDOM from 'react-dom'
import Griddle from 'griddle-react'
import { concat, assign, isEqual, keys, debounce } from 'lodash'
// import ReduxInfiniteScroll from 'components/common/ReduxInfiniteScroll'

import $ from 'jquery'
import { encodeUrlParams } from 'shared/Global'
import { ROOT_URL } from 'actions/config'

class InfiniteTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPage: -1,
      isLoading: false,
      maxPages: 0,
      results: [],
      total: 0,
      hasMore: true,

      selected: []
    }

    this.defaultRowMetaData = {
      'bodyCssClassName': this.getBodyCssClassName.bind(this)
    }

    this.lastRequest = null

    this.loadMoreDeb = debounce(this.loadMore.bind(this), 200)
  }

  componentWillMount () {
    const {onUpdateCount} = this.props
    onUpdateCount && onUpdateCount(0, [], true)
  }

  componentDidMount () {
    // if (this.props.useExternal) {
    //   this.getExternalData()
    // }

    this.domNode = ReactDOM.findDOMNode(this.refs.griddle)
    $(this.domNode).on('dblclick', 'tbody tr', (e) => {
      const index = $(e.target).closest('tr').index()
      const data = this.getCurrentData()
      if (data && data[index]) {
        let row = { props: { data: data[index] } }
        this.onRowClick(row)
        this.onRowDblClick(row)
      }
    })
  }

  componentDidUpdate (prevProps, prevState) {
    const {url, params, handleRecord} = this.props
    if (url !== prevProps.url || !isEqual(params, prevProps.params) ||
      (prevProps.handleRecord && !handleRecord) || (!prevProps.handleRecord && handleRecord)) {
      this.refresh()
    }
  }

  componentWillUnmount () {
    $(this.domNode).off('dblclick')
    if (this.lastRequest) {
      this.lastRequest.abort()
      this.lastRequest = null
    }
  }

  getCurrentData () {
    return this.props.useExternal ? this.state.results : this.props.data
  }

  getCountPerPage () {
    return Math.max(this.props.useExternal ? this.state.results.length : this.props.data.length, this.props.pageSize)
  }

  getExternalData (page, clear, force) {
    if (this.state.isLoading) {
      if (clear) {
        if (this.state.results.length) this.setState({results: []})
      }
      // console.log('Already loading.')
      if (!force) return
    }

    const {url, params, pageSize, onUpdateCount, onUpdateLoading, handleRecord} = this.props
    if (!url) return
    page = clear ? 1 : (page || 1)
    let urlParams = assign({
      page: page - 1,
      size: pageSize || 10
    }, params)

    this.setState({
      isLoading: true
    })

    onUpdateLoading && onUpdateLoading(true, page)

    if (this.lastRequest) {
      this.lastRequest.abort()
    }

    this.lastRequest = $.get(`${ROOT_URL}${url}?${encodeUrlParams(urlParams)}`).done(res => {
      const embedded = res._embedded
      let data = embedded[keys(embedded)[0]]
      if (handleRecord) {
        data = data.map(d => handleRecord(d))
      }

      const total = res.page.totalElements
      let state = {
        results: concat((clear ? [] : this.state.results), data),
        currentPage: page - 1,
        maxPages: res.page.totalPages,
        total,
        isLoading: false,
        hasMore: data.length > 0
      }

      this.setState(state)
      onUpdateCount && onUpdateCount(total, state.results)
      onUpdateLoading && onUpdateLoading(false)
    }).fail(() => {
      let state = {
        isLoading: false,
        hasMore: false
      }

      this.setState(state)
      onUpdateCount && onUpdateCount(this.state.total, this.state.results)
      onUpdateLoading && onUpdateLoading(false, page)
    })

    return this.lastRequest
  }

  getBodyCssClassName (data) {
    if (!this.props.selectable) return ''
    if (this.state.selected.indexOf(data[this.props.rowMetadata.key]) >= 0) return 'selected'
    return ''
  }

  onRowClick (row, e) {
    if (!this.props.selectable) return
    if (e && e.metaKey && this.props.allowMultiSelect) {
      const {selected} = this.state
      const key = row.props.data[this.props.rowMetadata.key]
      const index = selected.indexOf(key)
      if (index >= 0) selected.splice(index, 1)
      else selected.push(key)
      this.setState({ selected })
    } else {
      this.setState({
        selected: [row.props.data[this.props.rowMetadata.key]]
      })
    }
    const {onRowClick} = this.props
    onRowClick && onRowClick(row.props.data)
  }

  onRowDblClick (row) {
    if (!this.props.selectable) return
    this.setState({
      selected: [row.props.data[this.props.rowMetadata.key]]
    }, () => {
      this.props.onRowDblClick &&
      this.props.onRowDblClick(this.getSelected())
    })
  }

  getSelectedIndex () {
    let found = -1
    const results = this.getCurrentData()
    results.forEach((item, i) => {
      if (this.state.selected.indexOf(item[this.props.rowMetadata.key]) >= 0) {
        found = i
        return false
      }
    })
    return found
  }
  getSelected (multiple) {
    let found = null
    const results = this.getCurrentData()
    if (this.props.allowMultiSelect && multiple) {
      found = []
      results.forEach(item => {
        if (this.state.selected.indexOf(item[this.props.rowMetadata.key]) >= 0) {
          found.push(item)
        }
      })
    } else {
      results.forEach(item => {
        if (this.state.selected.indexOf(item[this.props.rowMetadata.key]) >= 0) {
          found = item
          return false
        }
      })
    }

    return found
  }

  refresh () {
    if (this.props.useExternal) {
      this.setState({
        hasMore: true
      })
      this.getExternalData(1, true, true)
    }
  }

  loadMore () {
    if (!this.state.hasMore) return
    this.getExternalData(this.state.currentPage + 2)
  }

  getBodyHeight () {
    const height = parseInt(this.props.bodyHeight || '0', 10)
    return height ? `${height}px` : height
  }

  renderTable () {
    const rowMetadata = assign({}
      , this.defaultRowMetaData
      , this.props.rowMetadata || {})
    const bodyHeight = this.getBodyHeight()
    const {tableClassName} = this.props
    return (
      <Griddle
        key="0"
        id={this.props.id}
        useExternal={false}
        enableSort={false}

        columns={this.props.cells.map(item => item.columnName)}
        columnMetadata={this.props.cells}
        rowMetadata={rowMetadata}
        rowHeight={this.props.rowHeight}
        bodyHeight={bodyHeight || null}
        showTableHeading={this.props.showTableHeading}

        results={this.getCurrentData()}
        resultsPerPage={this.getCountPerPage()}

        tableClassName={`table table-hover ${tableClassName || 'table-panel'}`}

        useFixedHeader={false}
        noDataMessage={this.props.noDataMessage}
        useGriddleStyles={false}

        onRowClick={this.onRowClick.bind(this)}

        onRowDblClick={this.onRowDblClick.bind(this)}
        ref="griddle"
      />
    )
  }

  render () {
    return (
      <div></div>
    )
    // const table = this.renderTable()
    // if (!this.props.bodyHeight) {
    //   return (
    //     <ReduxInfiniteScroll
    //       children={[table]}
    //       loadMore={this.loadMoreDeb}
    //       loadingMore={this.state.isLoading}
    //     />
    //   )
    // }
    // return table
  }
}

InfiniteTable.defaultProps = {
  id: null,
  url: '',
  params: null,
  cells: [],
  useExternal: true,
  data: [],

  pageSize: 20,
  rowMetadata: {},
  rowHeight: 50,
  showTableHeading: true,

  selectable: false,
  allowMultiSelect: false,
  noDataMessage: '',

  onUpdateCount: null,
  handleRecord: null
}

export default InfiniteTable
