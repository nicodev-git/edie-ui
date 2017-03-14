import React, { Component } from 'react'
import {
    Button
} from 'react-bootstrap'

import InfiniteTable, {ResponsiveInfiniteTable} from '../../../shared/InfiniteTable'

import { showAlert } from '../../../shared/Alert'

import SearchTabs from './SearchTabs'
import TabPage from '../../../shared/TabPage'
import TabPageBody from '../../../shared/TabPageBody'
import TabPageHeader from '../../../shared/TabPageHeader'

export default class Devices extends Component {
  constructor (props) {
    super(props)

    this.cellIPs = [{
      'displayName': 'Name',
      'columnName': 'name'
    }, {
      'displayName': 'IP',
      'columnName': 'ipaddress'
    }, {
      'displayName': 'Segment',
      'columnName': 'segment'
    }, {
      'displayName': 'Hostname',
      'columnName': 'hostname'
    }]
  }

  renderTable () {
    return (
      <ResponsiveInfiniteTable
        cells={this.cellIPs}
        ref="table"
        rowMetadata={{'key': 'id'}}
        selectable
        onRowDblClick={this.onRowDblClick.bind(this)}
        useExternal={false}
        data={[]}
      />
    )
  }

  renderTable2 () {
    return (
      <InfiniteTable
        url="/bi/searchDevicesDT"
        params={this.props.filter || {search: ''}}
        cells={this.cellIPs}
        ref="table"
        rowMetadata={{'key': 'id'}}
        selectable
        bodyHeight={this.props.containerHeight}
        onRowDblClick={this.onRowDblClick.bind(this)}
      />
    )
  }

  onClickOpenDevice () {
    const selected = this.refs.table.getSelected()
    if (!selected) return showAlert('Please choose device.')

    emit(EVENTS.MAP_DEVICE_CLICKED, selected) // eslint-disable-line no-undef
  }

  onRowDblClick (selected) {
    emit(EVENTS.MAP_DEVICE_CLICKED, selected) // eslint-disable-line no-undef
  }

  render () {
    return (
      <TabPage>
        <TabPageHeader title="Search">
          <div style={{margin: '0 auto', position: 'relative', textAlign: 'center'}}>
            <div className="pull-right">
              <Button>Open</Button>
            </div>

            <div style={{ position: 'relative', display: 'inline-block' }}>
              <input type="text" placeholder="Search" className="form-control"
                style={{width: '220px', paddingLeft: '35px'}}
                ref="search"/>
              <a className="btn" href="javascript:;" style={{position: 'absolute', left: 0, top: 0}}>
                <i className="fa fa-search" />
              </a>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SearchTabs} tab={1}>
          {this.renderTable()}
        </TabPageBody>
      </TabPage>
    )
  }
}

Devices.defaultProps = {
  filter: null
}
