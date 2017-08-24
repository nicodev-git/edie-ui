import React from 'react'
import {Paper} from 'material-ui'
import ReduxInfiniteScroll from 'redux-infinite-scroll'
import { concat, assign, isEqual, keys, debounce, chunk } from 'lodash'
import $ from 'jquery'

import { encodeUrlParams } from 'shared/Global'
import { ROOT_URL } from 'actions/config'

export default class LogPapers extends React.Component {
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
    this.lastRequest = null

    this.loadMoreDeb = debounce(this.loadMore.bind(this), 200)
  }

  componentWillMount () {
    const {onUpdateCount} = this.props
    onUpdateCount && onUpdateCount(0, [], true)
  }

  componentDidUpdate (prevProps, prevState) {
    const {url, params, handleRecord} = this.props
    if (url !== prevProps.url || !isEqual(params, prevProps.params) ||
      (prevProps.handleRecord && !handleRecord) || (!prevProps.handleRecord && handleRecord)) {
      this.refresh()
    }
  }

  componentWillUnmount () {
    if (this.lastRequest) {
      this.lastRequest.abort()
      this.lastRequest = null
    }
  }

  getCurrentData () {
    return this.props.useExternal ? this.state.results : this.props.data
  }

  getExternalData (page, clear) {
    if (this.state.isLoading) {
      if (clear) {
        if (this.state.results.length) this.setState({results: []})
      }
      return
    }

    const {url, params, pageSize, onUpdateCount, handleRecord} = this.props
    if (!url) return
    page = clear ? 1 : (page || 1)
    let urlParams = assign({
      page: page - 1,
      size: pageSize || 10
    }, params)

    this.setState({
      isLoading: true
    })

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
    })

    return this.lastRequest
  }

  refresh () {
    if (this.props.useExternal) {
      this.setState({
        hasMore: true
      })
      this.getExternalData(1, true)
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
    const bodyHeight = this.getBodyHeight()
    const {tableClassName, pageSize} = this.props

    const results = this.getCurrentData()

    const chunks = chunk(results, pageSize)
    return chunks.map((list, i) => {
      return (
        <Paper key={i} style={{height: 300, marginBottom: 20}}>
          {list.map(row =>
            <div key={row.id} className="inline-block flex-1">{row.entity.dataobj.line}</div>
          )}
        </Paper>
      )
    })
  }

  render () {
    const table = this.renderTable()
    if (!this.props.bodyHeight) {
      return (
        <ReduxInfiniteScroll
          children={table}
          loadMore={this.loadMoreDeb}
          loadingMore={this.state.isLoading}
        />
      )
    }
    return table
  }
}

LogPapers.defaultProps = {
  id: null,
  url: '',
  params: null,
  cells: [],
  useExternal: true,
  data: [],

  pageSize: 20,

  onUpdateCount: null,
  handleRecord: null
}
