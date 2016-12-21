import React from 'react'
import {
    ButtonGroup,
    DropdownButton,
    MenuItem
} from 'react-bootstrap'
import { findIndex } from 'lodash'

import {
    emit,
    listen,
    unlisten
} from 'shared/event/Emitter'
import { EVENTS } from 'shared/event/Events'
import { appendComponent, removeComponent } from '../../../../../util/Component'
import { showAlert } from '../../../../shared/Alert'
import GroupModal from './GroupModal'

class UserAndGroupOptions extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      groups: [],
      selected: -1,

      userPage: true
    }

    this.listeners = {
      [EVENTS.GROUP_ADDED]: this.onGroupAdded.bind(this)
    }
  }

  componentWillMount () {
    this.loadGroups()

    emit(EVENTS.GROUPS_SEL_CHANGED, '')

    listen(this.listeners)
  }

  componentWillUnmount () {
    unlisten(this.listeners)
  }

  loadGroups () {
    $.get(Api.group.getGroupsDT, {
      draw: 1,
      start: 0,
      length: 100
    }).done(res => {
      this.setState({
        groups: res.data
      })
    })
  }

  render () {
    const {userPage} = this.state

    return (
            <div className="tab-header">
                <div>
                    <span className="tab-title">Settings</span>
                </div>
                <div className="text-center margin-md-top">
                    <div className="pull-left">
                        <select className={`form-control ${userPage ? '' : 'hidden'}`}
                          onChange={this.onChangeGroup.bind(this)}
                          ref="groups">
                            <option value="">All groups</option>
                            {
                                this.state.groups.map(item =>
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )
                            }
                        </select>
                    </div>

                    <div style={{position: 'absolute', right: '25px'}}>
                        <ButtonGroup>

                            {
                                userPage ?
                                    <DropdownButton title="Edit" id="dd-setting-group-edit" pullRight>
                                        <MenuItem eventKey="1" onClick={emit.bind(null, EVENTS.USERS_ADD_CLICKED)}>Add</MenuItem>
                                        <MenuItem eventKey="2" onClick={emit.bind(null, EVENTS.USERS_EDIT_CLICKED)}>Edit</MenuItem>
                                        <MenuItem eventKey="3" onClick={emit.bind(null, EVENTS.USERS_REMOVE_CLICKED)}>Remove</MenuItem>
                                        <MenuItem eventKey="4" onClick={emit.bind(null, EVENTS.USERS_PASSWORD_CLICKED)}>Change Password</MenuItem>
                                        <MenuItem eventKey="5" onClick={emit.bind(null, EVENTS.USERS_PINCODE_CLICKED)}>Regenerate Pin</MenuItem>
                                    </DropdownButton> :
                                    <DropdownButton title="Edit" id="dd-setting-user-edit" pullRight>
                                        <MenuItem eventKey="1" onClick={emit.bind(null, EVENTS.GROUP_ADD_CLICKED)}>Add</MenuItem>
                                        <MenuItem eventKey="2" onClick={emit.bind(null, EVENTS.GROUP_EDIT_CLICKED)}>Edit</MenuItem>
                                        <MenuItem eventKey="3" onClick={emit.bind(null, EVENTS.GROUP_REMOVE_CLICKED)}>Remove</MenuItem>
                                    </DropdownButton>
                            }

                            <DropdownButton title={<i className="fa fa-gear"/>}
                              id="dd-setting-user-more" pullRight>
                                <MenuItem eventKey="2" onClick={this.onClickUsers.bind(this)}>
                                    <span className={userPage ? 'text-bold' : ''}> Users </span>
                                </MenuItem>
                                <MenuItem eventKey="1" onClick={this.onClickGroups.bind(this)}>
                                    <span className={userPage ? '' : 'text-bold'}> Groups </span></MenuItem>
                            </DropdownButton>

                        </ButtonGroup>
                    </div>
                </div>
            </div>
    )
  }

  onChangeGroup (e) {
    emit(EVENTS.USERS_GROUP_CHANGED, e.target.value)

    this.setState({
      selected: findIndex(this.state.groups,
                {id: parseInt(e.target.value)})
    })
  }

  onGroupAdded (group) {
    let groups = this.state.groups
    groups.push(group)
    this.setState({ group })
  }

  onClickUsers () {
    this.setState({ userPage: true })
    emit(EVENTS.USERS_MORE_CLICKED)
  }

  onClickGroups () {
    this.setState({ userPage: false })
    emit(EVENTS.GROUPS_MORE_CLICKED)
  }

    // ////////////////////////////////////

  onClickEditGroup () {
    const selected = this.state.selected
    if (selected < 0) return showAlert('Please select a group.')

    appendComponent(
            <GroupModal
              group={this.state.groups[selected]}
              onClose={this.onCloseEditGroup.bind(this)}
            />
        )
  }

  onCloseEditGroup (modal, group) {
    removeComponent(modal)
    if (!group) return
    this.onChangeGroup({
      target: { value: group.id}
    })

    this.loadGroups()
  }

    // /////////////////////////////////////

  onClickRemoveGroup () {
    const selected = this.state.selected
    if (selected < 0) return showAlert('Please select a group.')

    let groups = this.state.groups
    const group = groups[selected]
    $.get(Api.group.removeGroup, {
      id: group.id
    }).done(res => {
      if (!res.success) return showAlert('Remove failed!')
      groups.splice(selected, 1)
      this.setState({
        selected: -1,
        groups: groups
      })

      emit(EVENTS.USERS_GROUP_CHANGED, '')
      this.refs.groups.value = ''
    })
  }
}

UserAndGroupOptions.defaultProps = {}

export default UserAndGroupOptions
