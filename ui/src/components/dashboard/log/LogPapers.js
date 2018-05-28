import React from 'react'
import ReactDOM from 'react-dom'
import {Paper, IconButton} from '@material-ui/core'
import {assign, isEqual, keys, chunk, reverse, merge, isArray, findIndex, isObject} from 'lodash'
import $ from 'jquery'
import moment from 'moment'
import ReactPaginate from 'react-paginate'
import RenewIcon from '@material-ui/icons/Visibility'

import { encodeUrlParams, dateFormat } from 'shared/Global'
import { ROOT_URL } from 'actions/config'
import RefreshOverlay from 'components/common/RefreshOverlay'

import {paperZDepth} from 'style/common/materialStyles'

export default class LogPapers extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPage: 0,
      isLoading: false,
      maxPages: 0,
      results: [],
      filteredResults: [],
      total: 0,
      hasMore: true,

      selected: [],

      isAutoPull: false
    }
    this.lastRequest = null
    this.lastPullRequest = null
  }

  getHighlighted (entity, highlights) {
    let data = merge({}, entity)
    keys(highlights).forEach(path => {
      const highlighted = highlights[path]
      const pathElements = path.split('.')

      let el = data
      pathElements.forEach((pathEl, index) => {
        if (index === pathElements.length - 1) {
          if (isArray(el[pathEl])) {
            el = el[pathEl]
            el.forEach((item, index) => {
              if (highlighted.match(item)) el[index] = highlighted
            })
          } else if (isObject(el)){
            el[pathEl] = highlighted
          }
        } else {
          el = el[pathEl]
          if (isArray(el)) el = el[0]
        }
      })
    })

    return data
  }

  componentDidMount () {
    const {onUpdateCount} = this.props
    onUpdateCount && onUpdateCount(0, [], true)
    this.getExternalData(1, true)
  }

  componentDidUpdate (prevProps, prevState) {
    const {url, params, handleRecord, ignoreFilters} = this.props
    if (url !== prevProps.url || !isEqual(params, prevProps.params) ||
      (prevProps.handleRecord && !handleRecord) || (!prevProps.handleRecord && handleRecord)) {
      this.refresh()
    }

    if (JSON.stringify(prevProps.ignoreFilters) !== JSON.stringify(ignoreFilters)) {
      this.setState({
        filteredResults: this.filterData(this.state.results)
      })
    }
  }

  componentWillUnmount () {
    clearTimeout(this.reloadTimer)
    if (this.lastRequest) {
      this.lastRequest.abort()
      this.lastRequest = null
    }
    this.stopAutoPull()
  }

  getCurrentData () {
    return this.props.useExternal ? this.state.filteredResults : this.props.data
  }


  buildRequest (page) {
    const {url, params, pageSize} = this.props
    if (!url) return null
    page = page || 1
    let urlParams = assign({
      page: page - 1,
      size: pageSize || 10
    }, params)

    return $.get(`${ROOT_URL}${url}?${encodeUrlParams(urlParams)}`)
  }


  parseResponse (res) {
    const {handleRecord, noSearch, revertRows} = this.props
    const embedded = res._embedded
    let data = embedded[keys(embedded)[0]]

    data = data.map(d => ({
      ...d,
      entity: noSearch ? d.entity: this.getHighlighted(d.entity, d.highlights)
    }))
    if (handleRecord) {
      data = data.map(d => handleRecord(d))
    }

    if (revertRows) data = reverse(data)

    return data
  }

  filterData (data) {
    const {ignoreFilters} = this.props
    if (!ignoreFilters.length) return data
    return data.filter(row => {
      const line = row.entity && row.entity.dataobj ? row.entity.dataobj.line : ' '
      let found = false
      ignoreFilters.every(filter => {
        if (line.match(filter)) {
          found = true
          return false
        }
        return true
      })
      return !found
    })
  }

  getExternalData (page) {
    const {url, onUpdateCount} = this.props
    if (!url) return

    this.setState({
      isLoading: true
    })

    this.stopAutoPull()

    if (this.lastRequest) {
      this.lastRequest.abort()
    }

    this.lastRequest = this.buildRequest(page).done(res => {
      let data = this.parseResponse(res)

      const total = res.page.totalElements
      let state = {
        results: data || [],
        filteredResults: this.filterData(data || []),
        currentPage: page - 1,
        maxPages: res.page.totalPages,
        total,
        isLoading: false,
        hasMore: data.length > 0
      }

      this.setState(state, () => {
        this.focusBottom()
      })
      onUpdateCount && onUpdateCount(total, state.results)
    }).fail((req, reason) => {
      if (reason === 'abort') return
      if (page === 1) {
        this.reloadTimer = setTimeout(() => {
          this.getExternalData(page)
        }, 5000)
      }
    })

    return this.lastRequest
  }

  focusBottom () {
    setTimeout(() => {
      const node = ReactDOM.findDOMNode(this.refRowEnd)
      node && node.scrollIntoView()
    }, 100)
  }

  refresh () {
    if (this.props.useExternal) {
      this.setState({
        hasMore: true
      })
      this.getExternalData(1, true)
    }
  }

  getFileName(entity) {
    return entity && entity.dataobj ? entity.dataobj.file : ''
  }
  handlePageClick (page) {
    const {maxPages} = this.state
    if (this.props.reversePage) {
      this.getExternalData(maxPages - page.selected)
    } else {
      this.getExternalData(page.selected + 1)
    }
  }
  onClickView (row, index) {
    this.props.onClickView(row, index, this.state.currentPage, this.props.pageSize)
  }
  onRefRow (ref) {
    this.refRowEnd = ref
  }

  onClickAutoRenew () {
    if (this.state.isAutoPull) {
      this.stopAutoPull()
    } else {
      this.startAutoPull()
    }
  }

  startAutoPull () {
    this.setState({
      isAutoPull: true
    })

    this.autoPullTimer = setInterval(() => {
      this.lastPullRequest = this.buildRequest(0).done(res => {
        const {results, currentPage, isAutoPull} = this.state
        if (currentPage !== 0 || !isAutoPull) return
        const data = this.parseResponse(res).filter(p => findIndex(results, {id: p.id}) < 0)

        const newData = [...results, ...data]
        this.setState({
          results: newData,
          filteredResults: this.filterData(newData)
        }, () => {
          this.focusBottom()
        })
      })
    }, 5000)
  }

  stopAutoPull () {
    clearInterval(this.autoPullTimer)
    if (this.lastPullRequest) this.lastPullRequest.abort()
    this.setState({
      isAutoPull: false
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////

  renderTable () {
    const {pageSize, noCard, noSearch} = this.props

    const results = this.getCurrentData()

    const chunks = chunk(results, pageSize)
    return chunks.map((list, i) => {
      let title, timeFrom, timeTo
      if (list.length) {
        title = this.getFileName(list[0].entity) || this.getFileName(list[list.length - 1].entity)
        timeFrom = moment(list[0].entity.timestamp).format(dateFormat)
        timeTo = moment(list[list.length - 1].entity.timestamp).format(dateFormat)
      }

      let items = this.state.filteredResults

      items = items.map((row, index) =>
        <div key={row.id} className="padding-xs row-hover">
          <span dangerouslySetInnerHTML={{__html: row.entity && row.entity.dataobj ? row.entity.dataobj.line : ' '}}/>
          {!noSearch && <div className="link text-primary margin-md-left" onClick={this.onClickView.bind(this, row, index)}>
            View
          </div>}
        </div>
      )
      return (
        <div key={i} className="padding-sm-left padding-sm-right margin-md-bottom">
          {noCard ? (
            items
          ) : (
            <Paper zDepth={paperZDepth}>
              <div className="header-red">{title} : {timeFrom} ~ {timeTo}</div>
              {items}
            </Paper>
          )}
          <div key="row-end" ref={this.onRefRow.bind(this)}></div>
        </div>
      )
    })
  }

  renderPaging () {
    const {maxPages, currentPage} = this.state
    const {reversePage} = this.props
    return (
      <ReactPaginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        breakLabel={<a>...</a>}
        breakClassName={"break-me"}
        pageCount={maxPages}
        forcePage={reversePage ? (maxPages - 1) : currentPage}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={this.handlePageClick.bind(this)}
        containerClassName={"pagination inline-block"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}/>
    )
  }

  render () {
    const table = this.renderTable()
    const {showRenew} = this.props
    return (
      <div className="flex-vertical" style={{height: '100%', position: 'relative'}}>
        <div className="text-center" style={{marginTop: 10, marginBottom: 6}}>
          {this.renderPaging()}
        </div>
        <div style={{position: 'absolute', right: 10, top: 10}} className={showRenew ? '' : 'hidden'}>
          <IconButton onClick={this.onClickAutoRenew.bind(this)} tooltip="Show changes on realtime">
            <RenewIcon nativeColor={this.state.isAutoPull ? '#00bcd4' : ''}/>
          </IconButton>
        </div>
        <div className="flex-1" style={{overflow: 'auto', whiteSpace: 'normal', wordBreak: 'break-word'}}>
          {table}
        </div>
        {this.state.isLoading && <RefreshOverlay />}
      </div>
    )
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
  revertRows: false,
  reversePage: false,

  onUpdateCount: null,
  handleRecord: null,

  hideHeader: false,
  ignoreFilters: []
}
