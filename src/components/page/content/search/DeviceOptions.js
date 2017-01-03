import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

import {
  emit,
  listen,
  unlisten
} from 'shared/event/Emitter'
import { EVENTS } from 'shared/event/Events'

export default class DeviceOptions extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className="tab-header">
        <div>
          <span className="tab-title">Search</span>
        </div>
        <div className="text-center margin-md-top" >

          <div className="pull-right">
            <Button onClick={emit.bind(null, EVENTS.SEARCH_OPEN_DEVICE_CLICKED)}>Open</Button>
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

  onClickOpen () {

  }

  getOptions () {
    return {
      search: this.refs.search.value
    }
  }
}

DeviceOptions.defaultProps = {}
