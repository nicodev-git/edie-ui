import React, { Component } from 'react'
import {
    ButtonGroup,
    Button,
} from 'react-bootstrap'
import { findIndex } from 'lodash'

import {
    emit,
    listen,
    unlisten
} from 'shared/event/Emitter'
import { EVENTS } from 'shared/event/Events'

export default class CredentialOptions extends Component {
  constructor (props) {
    super(props)
    this.state = {}

    this.searchTimer = 0
  }

  render () {
    return (
      <div className="tab-header">
        <div className="text-center">
          <div className="pull-left">
            <span className="tab-title">Identities</span>
          </div>

          <div className="pull-right">
            <ButtonGroup>

              <Button onClick={emit.bind(null, EVENTS.CREDENTIALS_ADD_CLICKED)}>Add</Button>
              <Button onClick={emit.bind(null, EVENTS.CREDENTIALS_EDIT_CLICKED)}>Edit</Button>
              <Button onClick={emit.bind(null, EVENTS.CREDENTIALS_REMOVE_CLICKED)}>Remove</Button>

            </ButtonGroup>
          </div>

          <div className="inline-block">
            <input type="text" placeholder="Search" className="form-control"
              style={{width: '220px', paddingLeft: '35px'}}
              onKeyUp={this.onSearchKeyUp.bind(this)}/>
            <a className="btn" href="javascript:;"
              style={{position: 'absolute', left: 0, top: 0}}>
                <i className="fa fa-search" />
            </a>
          </div>
        </div>
        <div className="text-center margin-md-top" />
      </div>
    )
  }

  onSearchKeyUp (e) {
    clearTimeout(this.searchTimer)
    const value = e.target.value
    this.searchTimer = setTimeout(() => {
      emit(EVENTS.CREDENTIALS_KEYWORD_CHANGED, value)
    }, 200)
  }
}
