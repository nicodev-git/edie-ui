import React from 'react'
import Modal from 'react-bootstrap-modal'
import {
    Button
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { assign } from 'lodash'

import { showAlert } from '../../../../shared/Alert'
import {
    updateSettingUser,
    closeUserPasswordModal
} from '../../../../../actions'

const renderInput = field => (
    <div className="form-group col-md-12">
        <label className="control-label col-md-3 padding-sm-top text-right">{field.label}</label>
        <div className="col-md-9">
            <input {...field.input} type={field.type} className="form-control"/>
        </div>
    </div>
)

class PasswordModal extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  onHide () {
    this.onClickClose()
  }

  closeModal () {
    this.props.closeUserPasswordModal()
  }

  onClickClose () {
    this.closeModal()
  }

  handleFormSubmit (values) {
    if (!values.password) return showAlert('Please type password.')
    if (values.password !== values.confirm) return showAlert('Passwords do not match.')

    const {editUser} = this.props
    const user = assign({}, editUser, {
      password: values.password
    })

    this.props.updateSettingUser(user)
  }

  render () {
    const { handleSubmit } = this.props

    return (
      <Modal show onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">

        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            User Password
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close"
              onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>

        <div className="modal-body bootstrap-dialog-message">
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

            <Field name="password" component={renderInput} type="password" label="Password"/>
            <Field name="confirm" component={renderInput} type="password" label="Confirm"/>

            <div className="text-center">
              <Button className="btn-primary btn-sm" type="submit">Save</Button>
              <Button className="btn-sm margin-sm-left"
                onClick={this.onClickClose.bind(this)}>Cancel</Button>
            </div>
          </form>
        </div>
      </Modal>
    )
  }
}

function mapStateToProps (state) {
  return {
    editUser: state.settings.editUser
  }
}

const actions = {
  updateSettingUser,
  closeUserPasswordModal
}

export default connect(mapStateToProps, actions)(
  reduxForm({
    form: 'userPasswordForm'
  })(PasswordModal)
)
