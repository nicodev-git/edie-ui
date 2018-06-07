import React from 'react'

import {Button, Select} from '@material-ui/core'
import {Menu, MenuItem} from '@material-ui/core'
import InfiniteTable from 'components/common/InfiniteTable'
import { showAlert, showConfirm } from 'components/common/Alert'

import UserModal from './UserModal'
import PasswordModal from './PasswordModal'
import ProfileModal from './ProfileModal'

import SettingTabs from '../SettingTabs'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

import UserTabs from './UserTabs'

import {hasPermission} from 'shared/Permission'

export default class Users extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      groupId: '',
      groups: [],
      selected: -1,
      userMenuOpen: false,
      anchorEl: null
    }

    this.cells = [{
      'displayName': 'User Name',
      'columnName': 'username'
    }, {
      'displayName': 'Enabled',
      'columnName': 'enabled',
      'customComponent': p => {
        return <span>{p.data ? 'Yes' : 'No'}</span>
      }
    }, {
      'displayName': 'Role',
      'columnName': 'roles',
      'customComponent': p => {
        return <span>{(p.data || []).join(", ")}</span>
      }
    }, {
      'displayName': 'Full Name',
      'columnName': 'fullname'
    }, {
      'displayName': 'Email',
      'columnName': 'email'
    }, {
      'displayName': 'Phone',
      'columnName': 'phone'
    }]
  }

  componentWillMount () {
    this.props.closeSettingUserModal()
    this.props.fetchSettingUsers()
    this.props.fetchSettingMaps()
    this.props.fetchRoles()
  }

  renderContent () {
    return (
      <InfiniteTable
        cells={this.cells}
        ref="users"
        rowMetadata={{'key': 'id'}}
        selectable
        onRowDblClick={this.onEditUser.bind(this)}

        useExternal={false}
        data={this.props.users}
      />
    )
  }

  renderUserModal () {
    if (!this.props.userModalVisible) return null
    return (
      <UserModal {...this.props}/>
    )
  }

  renderPasswordModal () {
    if (!this.props.userPasswordModalVisible) return null
    return (
      <PasswordModal {...this.props}/>
    )
  }

  getUsers () {
    return this.refs.users
  }

  onChangeGroup (groupId) {
    this.setState({ groupId })
  }

  onAddGroup () {
    // appendComponent(
    //   <GroupModal sid={this.context.sid} onClose={this.onGroupAdded.bind(this)}/>
    // )
  }

  onClickEditGroup () {
    const selected = this.state.selected
    if (selected < 0) return showAlert('Please select a group.')

    // appendComponent(
    //   <GroupModal group={this.state.groups[selected]} onClose={this.onCloseEditGroup.bind(this)}
    //   />
    // )
  }

  onClickRemoveGroup () {
    const selected = this.state.selected
    if (selected < 0) return showAlert('Please select a group.')

    let groups = this.state.groups
    const group = groups[selected]
    $.get(`${ROOT_URL}${Api.group.removeGroup}`, { // eslint-disable-line no-undef
      id: group.id
    }).done(res => {
      if (!res.success) return showAlert('Remove failed!')
      groups.splice(selected, 1)
      this.setState({
        selected: -1,
        groups: groups
      })

      this.refs.groups.value = ''
    })
  }

  onAddUser () {
    this.props.openSettingUserModal()
  }

  onEditUser () {
    const selected = this.getUsers().getSelected()
    if (!selected) return showAlert('Please select user.')

    // this.props.openSettingUserModal(selected)
    this.props.history.push(`/settings/users/${selected.username}/edit`)
  }

  onRemoveUser () {
    const selected = this.getUsers().getSelected()
    if (!selected) return showAlert('Please select user.')

    showConfirm('Click OK to remove user.', btn => {
      if (btn !== 'ok') return

      this.props.deleteSettingUser(selected)
    })
  }

  onChangePassword () {
    const selected = this.getUsers().getSelected()
    if (!selected) return showAlert('Please select user.')
    this.props.openUserPasswordModal(selected)
  }

  onClickPin () {
    const selected = this.refs.users.getSelected()
    if (!selected) return showAlert('Please select user.')

    $.get(`${ROOT_URL}${Api.user.resetPin}`, { // eslint-disable-line no-undef
      id: selected.id
    }).done(res => {
      if (res.success) {
        let pin = res.object
        pin = `${pin.substring(0, 4)} - ${
                    pin.substring(4, 8)} - ${
                    pin.substring(8, 12)}`
        showAlert(pin)
      } else {
        showAlert('Failed!')
      }
    }).fail(() => {
      showAlert('Failed!')
    })
  }

  onClickProfile () {
    this.props.openProfileModal()
  }

  onOpenUserMenu (e) {
    this.setState({
      userMenuOpen: true,
      anchorEl: e.target
    })
  }

  onCloseUserMenu () {
    this.setState({
      userMenuOpen: false
    })
  }

  renderProfileModal () {
    if (!this.props.profileModalVisible) return
    return (
      <ProfileModal {...this.props} />
    )
  }

  render () {
    const {user} = this.props
    const canEdit = hasPermission(user, 'EditSettings')
    return (
      <TabPage>
        <TabPageHeader title="Settings">
          <div className="text-center margin-md-top">
            <div className="pull-left text-left">
              <Select
                onChange={this.onChangeGroup.bind(this)}
                value="">
                <MenuItem value="">All groups</MenuItem>
                {
                  this.state.groups.map(item =>
                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                  )
                }
              </Select>
            </div>

            <div style={{position: 'absolute', right: '25px'}}>
              {canEdit ? <Button variant="raised" onClick={this.onOpenUserMenu.bind(this)}>User</Button> : null}
              <Menu
                open={this.state.userMenuOpen}
                anchorEl={this.state.anchorEl}
                onClose={this.onCloseUserMenu.bind(this)}>
                <MenuItem onClick={this.onAddUser.bind(this)}>Add</MenuItem>
                <MenuItem onClick={this.onEditUser.bind(this)}>Edit</MenuItem>
                <MenuItem onClick={this.onRemoveUser.bind(this)}>Remove</MenuItem>
                <MenuItem onClick={this.onChangePassword.bind(this)}>Change Password</MenuItem>
                <MenuItem onClick={this.onClickPin.bind(this)}>Regenerate Pin</MenuItem>
              </Menu>
              &nbsp;
              <Button variant="raised" onClick={this.onClickProfile.bind(this)}>Profile</Button>&nbsp;
              <UserTabs history={this.props.history}/>&nbsp;
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={3} history={this.props.history} location={this.props.location} transparent>
          {this.renderContent()}
          {this.renderPasswordModal()}
          {this.renderProfileModal()}
          {this.renderUserModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}
