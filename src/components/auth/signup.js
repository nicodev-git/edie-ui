import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { validate } from './signupvalidation'

import { signup } from '../../actions/AuthActions'
import Input from '../input'

class Signup extends Component {

  handleFormSubmit (formProps) {
    this.props.signup(formProps)
  }

  renderAlert () {
    if (this.props.errorMessage) {
      return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
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

function mapStateToProps (state) {
  return { errorMessage: state.auth.error }
}

export default connect(mapStateToProps, { signup })(
  reduxForm({
    form: 'signup',
    validate
  })(Signup)
)
