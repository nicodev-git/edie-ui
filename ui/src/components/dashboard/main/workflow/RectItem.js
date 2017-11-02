import React from 'react'
import {findIndex} from 'lodash'
import axios from 'axios'

import AppletCard from 'components/common/AppletCard'

import { ROOT_URL } from 'actions/config'
import {buildServiceParams} from 'util/Query'
import {getRanges} from 'components/common/DateRangePicker'
import { severities, queryDateFormat, collections } from 'shared/Global'

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
    const {workflows, devices, allDevices} = this.props

    const data = JSON.parse(search.data)
    const searchParams = buildServiceParams(data, {
      dateRanges: getRanges(),
      collections, severities, workflows,
      allDevices: devices || allDevices,
      queryDateFormat
    })

    axios.get(`${ROOT_URL}/search/query`, {
      params: searchParams
    }).then(res => {
      cb(res.data.page.totalElements)
    }).catch(() => {
      cb(0)
    })
    return true
  }

  fetchResult () {
    const {goodId, badId} = this.props.rect

    const goodSearch = goodId ? this.getSearch(goodId) : null
    const badSearch = badId ? this.getSearch(badId) : null

    if (!goodSearch && !badSearch) return

    if (goodSearch) {
      this.getSearchResult(goodSearch, count => {
        this.setState({good: count})
      })
    }
    if (badSearch) {
      this.getSearchResult(badSearch, count => {
        this.setState({bad: count})
      })
    }

    this.setState({
      fetched: true
    })
  }

  render () {
    const {rect, onClick, onClickDelete} = this.props
    return (
      <AppletCard
        color="#3cba54"
        desc={rect.name}
        img="/resources/images/dashboard/workflow.png"
        onClick={onClick}
        onClickDelete={onClickDelete}
      />
    )
  }
}
