import React from 'react'
import {
    ButtonGroup,
    Button,
    DropdownButton,
    MenuItem
} from 'react-bootstrap'
import {
    emit,
    listen,
    unlisten
} from 'shared/event/Emitter'

import { EVENTS } from 'shared/event/Events'
import { ROOT_URL } from 'actions/config'

export default class RuleOptions extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tabIndex: 1,
      categories: [],
      deviceTypes: []
    }

    this.listeners = {
      [EVENTS.RULE_LOGICAL_OPENED]: this.onLogicalOpened.bind(this)
    }

    this.searchTimer = 0
  }

  componentWillMount () {
    $.get(`${ROOT_URL}${Api.rule.getCategories}`).done(res => {
      this.setState({
        categories: res
      })

      this.onChangeCategory({ target: { value: res[0].id } })
    })

    $.get(`${ROOT_URL}${Api.devices.getDeviceTypes}`).done(res => {
      this.setState({
        deviceTypes: res.object
      })
      this.onChangeDeviceType({ target: { value: res.object[0].id } })
    })

    listen(this.listeners)
  }

  componentWillUnmount () {
    unlisten(this.listeners)
  }

  render () {
    const {tabIndex} = this.state
    const props = this.props

    return (
      <div className="tab-header">
        <div className="margin-md-bottom">
            <span className="tab-title">Settings</span>
        </div>
        <div className="text-center col-md-12 p-none">
          <div className="pull-left form-inline">
            <select className={`form-control ${tabIndex === 1 ? '' : 'hidden'}`}
              onChange={this.onChangeCategory.bind(this)}>
                {
                    this.state.categories.map(item =>
                        <option value={item.id} key={item.id}>{item.name}</option>
                    )
                }
            </select>

            <Button className={tabIndex === 1 ? '' : 'hidden'}
              onClick={this.onClickEditCategory.bind(this)}>Edit</Button>
          </div>

          <div style={{position: 'absolute', right: '25px'}}>
            <ButtonGroup className={tabIndex === 1 ? '' : 'hidden'}>

              <Button onClick={emit.bind(null, EVENTS.RULE_OPEN_LOGICAL_CLICKED)}>Open</Button>
              <Button onClick={emit.bind(null, EVENTS.RULE_MOVE_LOGICAL_CLICKED)}>Move</Button>
              <Button onClick={emit.bind(null, EVENTS.RULE_BACKUP_CLICKED)}>Backup</Button>
              <Button onClick={emit.bind(null, EVENTS.RULE_RESTORE_CLICKED)}>Restore</Button>

            </ButtonGroup>

            <select className={`form-control ${tabIndex === -1 ? '' : 'hidden'}`}
              onChange={this.onChangeDeviceType.bind(this)}>
                {
                  this.state.deviceTypes.map(item =>
                    <option value={item.id} key={item.id}>{item.devicename}</option>
                  )
                }
            </select>

            <ButtonGroup className={tabIndex === 2 ? '' : 'hidden'}>

              <Button onClick={this.onClickBack.bind(this)}>Back</Button>
              <Button onClick={emit.bind(null, EVENTS.RULE_BACKUP_CLICKED)}>Backup</Button>
              <Button onClick={emit.bind(null, EVENTS.RULE_RESTORE_CLICKED)}>Restore</Button>

            </ButtonGroup>

          </div>

          <div className="inline-block">
            <input type="text" placeholder="Search" className="form-control"
              style={{width: '220px', paddingLeft: '35px'}}
              onKeyUp={this.onSearchKeyUp.bind(this)}
              ref="search"/>
            <a className="btn" href="javascript:;" style={{position: 'absolute', left: 0, top: 0}}>
                <i className="fa fa-search" />
            </a>
          </div>
        </div>
      </div>
    )
  }

  onChangeCategory (e) {
    emit(EVENTS.RULE_CATEGORY_CHANGED, e.target.value)
  }

  onChangeDeviceType (e) {
    emit(EVENTS.RULE_DEVICE_TYPE_CHANGED, e.target.value)
  }

  onLogicalOpened () {
    this.setState({ tabIndex: 2 })
  }

  onClickBack () {
    emit(EVENTS.RULE_SHOW_LOGICAL)
    this.setState({ tabIndex: 1 })
  }

  onSearchKeyUp () {
    clearTimeout(this.searchTimer)
    const keyword = this.refs.search.value
    this.searchTimer = setTimeout(() => {
      emit(EVENTS.RULE_KEYWORD_CHANGED, keyword)
    }, 200)
  }

  onClickEditCategory () {

  }
}
