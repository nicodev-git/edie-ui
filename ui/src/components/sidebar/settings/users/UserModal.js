import React from 'react'
import { connect } from 'react-redux'
import { assign } from 'lodash'
import { reduxForm, change } from 'redux-form'
import axios from 'axios'
import { SimpleModalForm } from 'components/modal'
import { validate } from 'components/modal/validation/NameValidation'

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
      {name: 'Name', key: 'username'},
      {name: 'Full Name', key: 'fullname'},
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
