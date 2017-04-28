import React, { Component } from 'react'
import {TextField, FlatButton} from 'material-ui'
import ActionSearch from 'material-ui/svg-icons/action/search'
import moment from 'moment'
import {assign} from 'lodash'

import InfiniteTable from 'components/shared/InfiniteTable'

import TabPage from 'components/shared/TabPage'
import TabPageBody from 'components/shared/TabPageBody'
import TabPageHeader from 'components/shared/TabPageHeader'
import MonitorTabs from './MonitorTabs'

import { parseSearchQuery } from 'shared/Global'

export default class ApplicationTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      query: ''
    }
    this.columns = [{
      'displayName': 'Name',
      'columnName': 'dataobj.Name',
      'cssClassName': 'nowrap'
    }, {
      'displayName': 'InstallDate',
      'columnName': 'dataobj.InstallDate',
      'cssClassName': 'width-140',
      'customComponent': (props) => {
        let val = props.data
        if (!val) return <span />
        val = `${val.substring(0, 4)}-${
                    val.substring(4, 6)}-${
                    val.substring(6)}`

        return <span>{val}</span>
      }
    }, {
      'displayName': 'Version',
      'columnName': 'dataobj.Version',
      'cssClassName': 'width-120'
    }, {
      'displayName': 'Publisher',
      'columnName': 'dataobj.Publisher',
      'cssClassName': 'width-200'
    }, {
      'displayName': 'Size',
      'columnName': 'dataobj.Size',
      'cssClassName': 'width-120'
    }]
  }
  onChangeQuery (e) {
    this.setState({
      query: e.target.value
    })
  }
  onKeyupQuery (e) {
    if (e.keyCode === 13) {
      this.onClickSearch()
    }
  }
  onClickSearch () {
    const query = `deviceid=${this.props.device.id} and monitortype=app and eventType=AGENT and _all=${this.state.query}`
    const queryChips = parseSearchQuery(query)
    this.props.updateSearchParams(assign({}, this.props.params, {
      query,
      severity: 'HIGH,MEDIUM',
      collections: 'event',
      workflow: '',
      dateFrom: moment().startOf('year').valueOf(),
      dateTo: moment().endOf('year').valueOf()
    }))

    this.props.replaceSearchWfs([])
    this.props.updateQueryChips(queryChips)

    this.props.router.push('/search')
  }
  renderOptions () {
    const {query} = this.state
    return (
      <div className="text-center">
        <div className="inline-block">
          <TextField name="query" value={query} onChange={this.onChangeQuery.bind(this)} onKeyUp={this.onKeyupQuery.bind(this)}/>
          <FlatButton icon={<ActionSearch />} onTouchTap={this.onClickSearch.bind(this)}/>
        </div>
      </div>
    )
  }
  renderBody () {
    return (
      <InfiniteTable
        cells={this.columns}
        ref="table"
        rowMetadata={{'key': 'id'}}
        rowHeight={38}
        selectable

        url="/event/search/findAgentEvents"
        params={{
          deviceid: this.props.device.id,
          eventType: 'AGENT',
          monitortype: 'app',
          sort: 'timestamp,desc'
        }}
      />
    )
  }
  render () {
    const {device} = this.props
    return (
      <TabPage>
        <TabPageHeader title={device.name}>
          {this.renderOptions()}
        </TabPageHeader>
        <TabPageBody tabs={MonitorTabs(device.id)}>
          {this.renderBody()}
        </TabPageBody>
      </TabPage>
    )
  }
}
