import React from 'react'
import {concat, assign, findIndex} from 'lodash'

import GaugePanel from './GaugePanel'

export default class DeviceDashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount () {
    this.props.fetchGroupDevicesAndLines(this.props.device.id)
    this.props.fetchSysSearchOptions()
  }

  getGauges () {
    const {mapDevices} = this.props
    return mapDevices.filter(p => p.params && !!p.params.graph)
  }

  getUserSearchOptions () {
    const {userInfo} = this.props
    if (!userInfo) return []
    const {searchOptions} = userInfo
    if (!searchOptions) return []
    try {
      return JSON.parse(searchOptions)
    } catch (e) {
      console.log(e)
    }
    return []
  }

  getSearchList () {
    const {sysSearchOptions} = this.props
    return concat([], this.getUserSearchOptions().map(p => {
      return assign({}, p, {
        type: 'User'
      })
    }), sysSearchOptions.map(p => {
      return assign({}, p, {
        type: 'System'
      })
    }))
  }

  getSavedSearch (id) {
    const userOptions = this.getUserSearchOptions()
    let index = findIndex(userOptions, {id})
    if (index >= 0) return userOptions[index]

    const {sysSearchOptions} = this.props
    index = findIndex(sysSearchOptions, {id})
    if (index >= 0) return sysSearchOptions[index]

    return null
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  renderGauge (p) {
    const savedSearch = this.getSavedSearch(p.params.savedSearch)
    if (!savedSearch) return null
    const searchParams = JSON.parse(savedSearch.data)
    return (
      <GaugePanel key={p.id} gauge={p} searchParams={searchParams} searchList={this.getSearchList()}/>
    )
  }
  render () {
    return (
      <div className="padding-md-top">
        {this.getGauges().map(p => this.renderGauge(p))}
      </div>
    )
  }
}
