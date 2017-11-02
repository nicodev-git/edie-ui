import React from 'react'
import {findIndex} from 'lodash'

import AppletCard from 'components/common/AppletCard'

import {buildServiceParams} from 'util/Query'

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

  getSearchResult (id) {
    const search = this.getSearch(id)
    if (!search) return false
    const data = JSON.parse(search.data)
    const params = {
      page: 0,
      size: 1,
      draw: 1,
      q: data.q
    }
    return true
  }

  fetchResult () {
    const {goodId, badId} = this.props.rect
    if (goodId) {

    }
    if (badId) {

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
