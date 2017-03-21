import React from 'react'
import moment from 'moment'

import {ResponsiveInfiniteTable} from '../../../shared/InfiniteTable'
import DateRangePicker from '../../../shared/DateRangePicker'

import SearchTabs from './SearchTabs'
import TabPage from '../../../shared/TabPage'
import TabPageBody from '../../../shared/TabPageBody'
import TabPageHeader from '../../../shared/TabPageHeader'

class Events extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}

    this.cells = [{
      'displayName': 'Datetime',
      'columnName': 'timestamp',
      'cssClassName': 'width-200',
      'customComponent': props => {
        let data = moment(props.data).format('YYYY-MM-DD HH:mm:ss').toString()
        return <span>{data}</span>
      }
    }, {
      'displayName': 'Result',
      'columnName': 'lastResult.description',
      'customComponent': props => {
        const data = props.rowData.lastResult
        return <span>{data ? JSON.stringify(data) : ''}</span>
      }
    }]
  }

  renderTable () {
    return (
      <ResponsiveInfiniteTable
        cells={this.cells}
        ref="table"
        rowMetadata={{'key': 'id'}}
        selectable
        url="/event"
        params={{
          sort: 'timestamp,desc'
        }}
      />
    )
  }

  onSearchKeyUp (e) {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.onFilterChange()
    }, 200)
  }

  onFilterChange () {
    this.props.onFilterChange && this.props.onFilterChange(this.getOptions())
  }

  render () {
    const defaultDate = 'Last 7 Days'

    return (
      <TabPage>
        <TabPageHeader title="Search">
          <div className="text-center margin-md-top" >
            <div className="form-inline" style={{position: 'absolute'}}>

              <div className="text-left" style={{'verticalAlign': 'middle', 'lineHeight': 2.2}}>
                <DateRangePicker onClickRange={this.onFilterChange} default={defaultDate} ref="dp">
                  <i className="fa fa-caret-down margin-xs-left" />
                </DateRangePicker>
              </div>
            </div>

            <div style={{ position: 'relative', display: 'inline-block' }}>
              <input
                type="text" placeholder="Search" className="form-control"
                style={{width: '220px', paddingLeft: '35px'}}
                onChange={this.onSearchKeyUp.bind(this)}
                ref="search"/>
              <a className="btn" href="javascript:;" style={{position: 'absolute', left: 0, top: 0}}>
                <i className="fa fa-search" />
              </a>
            </div>

          </div>
        </TabPageHeader>

        <TabPageBody tabs={SearchTabs} tab={3}>
        </TabPageBody>
      </TabPage>
    )
  }
}

export default Events
