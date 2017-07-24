import React from 'react'
import {concat, assign, findIndex} from 'lodash'

import GaugeView from './GaugeView'

import { parseSearchQuery } from 'shared/Global'

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
    const savedSearch = this.getSavedSearch('a1e2f323-2139-cf7c-89df-aeb9ca56553c')
    if (!savedSearch) return null
    const params = JSON.parse(savedSearch.data)
    const queryChips = parseSearchQuery(params.query)
    return (
      <div className="col-md-4 margin-sm-bottom flex-vertical flex-1" style={{height: 350}} key={p.id}>
        <div className="panel panel-blue flex-vertical flex-1">
          <div className="panel-heading">
            <h4 className="panel-title">{p.name}</h4>
          </div>
          <div className="panel-body flex-vertical flex-1">
            <GaugeView queryChips={queryChips} params={params}/>
          </div>
        </div>
      </div>
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
