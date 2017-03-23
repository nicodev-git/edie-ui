import React from 'react'
import { connect } from 'react-redux'
import { assign } from 'lodash'
import { reduxForm, change } from 'redux-form'
import axios from 'axios'
import { ROOT_URL } from '../../../../../actions/config'
import { SimpleModalForm } from '../../../../modal'
import { validate } from '../../../../modal/validation/NameValidation'

class UserModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true,
      defaultMaps: [],
      roles: []
    }
    this.closeModal = this.closeModal.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.renderMapOptions = this.renderMapOptions.bind(this)
    this.renderRoleOptions = this.renderRoleOptions.bind(this)
  }

  loadDefaultMaps () {
    return $.get(`${ROOT_URL}${Api.dashboard.getMaps}?draw=1`).done(res => { // eslint-disable-line no-undef
      this.setState({
        defaultMaps: res.data
      })
    })
  }

  loadRoles () {
    return $.get(`${ROOT_URL}${Api.user.getRoles}`, { // eslint-disable-line no-undef
      sid: this.context.sid
    }).done(res => {
      if (!res.object) return

      this.setState({ roles: res.object.map(item => item.role) })
    })
  }

  closeModal () {
    this.props.closeSettingUserModal()
  }

  handleFormSubmit (values) {
    const { editUser } = this.props
    let user = assign({}, editUser, values)
    if (editUser) {
      this.props.updateSettingUser(user)
    } else {
      this.props.addSettingUser(user)
    }
  }

  onClickPin () {
    axios.get('/genpin').then(response => {
      this.props.dispatch(change('userEditForm', 'pincode', response.data))
    })
  }

  renderMapOptions () {
    let maps = this.state.defaultMaps
    let options = maps.map(item => ({value: item.id, label: item.mapname}))
    return options
  }

  renderRoleOptions () {
    let roles = this.state.roles
    let options = roles.map(item => ({value: item, label: item}))
    return options
  }

  render () {
    const { handleSubmit } = this.props
    let header = 'User Detail'
    let buttonText = 'Save'
    let mapOptions = this.renderMapOptions()
    let roleOptions = this.renderRoleOptions()
    let content = [
      {name: 'Name'},
      {name: 'Full Name'},
      {type: 'password', name: 'Password'},
      {name: 'Email'},
      {name: 'Phone'},
      {name: 'Pin Code'},
      {type: 'select', name: 'Default Map', options: mapOptions},
      {type: 'select', name: 'Role', options: roleOptions}
    ]
    return (
      <SimpleModalForm
        show={this.state.open}
        onHide={this.closeModal}
        onSubmit={handleSubmit(this.handleFormSubmit)}
        content={content}
        header={header}
        buttonText={buttonText}
      />
    )
  }
}

export default connect(
  state => ({
    initialValues: state.settings.editUser,
    validate: validate
  })
)(reduxForm({form: 'userEditForm'})(UserModal))
