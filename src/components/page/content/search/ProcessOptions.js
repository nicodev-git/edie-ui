import React from 'react'
import {
  emit,
  listen,
  unlisten
} from 'shared/event/Emitter'
import { EVENTS } from 'shared/event/Events'

import DateRangePicker from '../../../shared/DateRangePicker'

export default class ProcessOptions extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.timer = 0

    this.onFilterChange = this.onFilterChange.bind(this)
  }

  componentDidMount () {
    setTimeout(() => {
      this.onFilterChange()
    }, 100)
  }

  render () {
    const defaultDate = 'Last 7 Days'

    return (
      <div className="tab-header">
        <div>
          <span className="tab-title">Search</span>
        </div>
        <div className="text-center margin-md-top" >

          <div className="form-inline" style={{position: 'absolute'}}>

            <div className="text-left"
              style={{'verticalAlign': 'middle', 'lineHeight': 2.2}}>
                <DateRangePicker onClickRange={this.onFilterChange}
                  default={defaultDate} ref="dp">
                    <i className="fa fa-caret-down margin-xs-left" />
                </DateRangePicker>
            </div>
          </div>

          <div style={{ position: 'relative', display: 'inline-block'}}>
            <input type="text" placeholder="Search" className="form-control"
              style={{width: '220px', paddingLeft: '35px'}}
              onChange={this.onSearchKeyUp.bind(this)}
              ref="search"/>
            <a className="btn" href="javascript:;" style={{position: 'absolute', left: 0, top: 0}}>
                <i className="fa fa-search" />
            </a>
          </div>

        </div>
      </div>
    )
  }

  onSearchKeyUp (e) {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.onFilterChange()
    }, 200)
  }

  onFilterChange () {
    this.props.onFilterChange &&
        this.props.onFilterChange(this.getOptions())
  }

  getOptions () {
    const {refs} = this
    const {search, dp} = refs

    return {
      search: search.value,

      startTime: dp ? dp.getStartDate().format('YYYY-MM-DD HH:mm:ss') : '',
      endTime: dp ? dp.getEndDate().format('YYYY-MM-DD HH:mm:ss') : ''
    }
  }
}

ProcessOptions.defaultProps = {}
