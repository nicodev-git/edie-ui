import React from 'react'
import {findIndex} from 'lodash'
import axios from 'axios'

// import AppletCard from 'components/common/AppletCard'

import { ROOT_URL } from 'actions/config'
import {buildServiceParams} from 'util/Query'
import {getRanges} from 'components/common/DateRangePicker'
import { severities, queryDateFormat, collections, encodeUrlParams } from 'shared/Global'

export default class RectItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      good: 0,
      bad: 0,
      fetched: false
    }
  }
  componentWillMount () {
    this.fetchResult()
  }

  componentDidUpdate (prevProps, prevState) {
    const {searchList} = prevProps

    if (JSON.stringify(prevProps.rect) !== JSON.stringify(this.props.rect)) {
      this.fetchResult()
    } else if (!this.state.fetched && searchList && JSON.stringify(this.props.searchList) !== JSON.stringify(searchList)) {
      this.fetchResult()
    }
  }

  getSearch (id) {
    const {searchList} = this.props
    if (!searchList) return null
    const index = findIndex(searchList, {id})
    if (index < 0) return null
    return searchList[index]
  }

  getSearchResult (search, cb) {
    if (!search) return true
    const {workflows, devices, allDevices} = this.props

    const data = JSON.parse(search.data)
    const searchParams = buildServiceParams(data, {
      dateRanges: getRanges(),
      collections, severities, workflows,
      allDevices: devices || allDevices,
      queryDateFormat
    })

    const params = {
      q: searchParams.query || '',
      from: searchParams.from,
      to: searchParams.to,
      types: searchParams.types,
      collections: searchParams.collections,
      severity: searchParams.severity,
      page: 0,
      size: 1,
      draw: 1
    }

    return axios.get(`${ROOT_URL}/search/query?${encodeUrlParams(params)}`)/*.then(res => {
      cb(res.data.page.totalElements)
    }).catch(() => {
      cb(0)
    })
    return true*/
  }

  fetchResult () {
    const {goodId, badId} = this.props.rect

    const goodSearch = goodId ? this.getSearch(goodId) : null
    const badSearch = badId ? this.getSearch(badId) : null

    if (!goodSearch && !badSearch) return

    axios.all([
      this.getSearchResult(badSearch),
      this.getSearchResult(goodSearch)
    ]).then(axios.spread((res1, res2) => {
      const bad = res1.data ? res1.data.page.totalElements : 0
      const good = res2.data ? res2.data.page.totalElements : 0

      this.setState({bad, good}, this.notifyUpdate.bind(this))
    }))
  }

  getColor () {
    const {good, bad} = this.state
    const color = bad ? '#D1282C' : (good ?
      '#3cba54' :
      'gray')
    return color
  }

  notifyUpdate () {
    const {good, bad} = this.state
    const {onUpdateColor, rect} = this.props
    onUpdateColor && onUpdateColor(rect.id, good, bad)
  }

  render () {
    return null
    // const {rect, onClick, onClickDelete} = this.props
    // const {good, bad} = this.state
    // const color = bad ? '#D1282C' : (good ?
    //   '#3cba54' :
    //   'gray')
    // return (
    //   <AppletCard
    //     color={color}
    //     desc={rect.name}
    //     img="/resources/images/dashboard/workflow.png"
    //     onClick={onClick}
    //     onClickDelete={onClickDelete}
    //   />
    // )
  }
}
