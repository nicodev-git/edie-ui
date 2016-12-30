import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { validate } from './SignupValidation'
import Input from '../Input'

class Signup extends Component {

  handleFormSubmit (formProps) {
    let { signup, dispatch } = this.props
    dispatch(signup(formProps))
  }

  renderAlert () {
    let { errorMessage } = this.props
    if (errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {errorMessage}
        </div>
      )
    }
  }
  render () {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <Field
            label="Email:"
            name="email"
            component={Input}
            type="text"
          />
        </fieldset>
        <fieldset className="form-group">
          <Field
            label="Password:"
            name="password"
            component={Input}
            type="password"
          />
        </fieldset>
        <fieldset className="form-group">
          <Field
            label="Confirm Password:"
            name="passwordConfirm"
            component={Input}
            type="password"
          />
        </fieldset>
        { this.renderAlert() }
        <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'signup',
  validate
})(Signup)
