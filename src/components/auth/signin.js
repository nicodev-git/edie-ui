import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import { signUser } from '../../actions/AuthActions'

const renderInput = field =>   // Define stateless component to render input and errors
    <div>
        <input className={`form-control ${field.className}`} {...field.input}
          type={field.type}
          placeholder={field.label}/>
    </div>

class Signin extends Component { // eslint-disable-line react/no-multi-comp

  handleFormSubmit ({ email, password }) {
    this.props.signUser({email, password})
  }

  renderAlert () {
    if (this.props.errorMessage) {
      return (
                <div className="alert alert-danger">
                    {this.props.errorMessage}
                </div>
      )
    }
  }

  render () {
    const { handleSubmit } = this.props
    return (
            <div className="login">
                <div className="heading">
                    <h1>Incident Manager</h1>
                    <p>Version 3.0</p>
                </div>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <div className="box">
                        <div className="logo"><img src="/images/logo.png" /></div>
                        <div className="form">
                            <div className="field"><img src="/images/user_icon.png" /></div>
                            <Field name="email" component={renderInput} type="text" label="Username" className="text_field"/>

                            <div className="line" />

                            <div className="field"><img src="/images/pass_icon.png"/></div>
                            <Field name="password" component={renderInput} type="password" label="Password" className="text_field" />

                        </div>
                        <button type="submit" style={{border: 'none', padding: 0, background: 'none'}}>
                            <img src="/images/log_in_btn.png"/>
                        </button>

                        { this.renderAlert() }
                    </div>
                </form>
                <div className="copyright_text">
                    Copyright 2016 SecuRegion Ltd. All Rights Reserved.
                </div>
            </div>
    )
  }
}

function mapStateToProps (state) {
  return {errorMessage: state.auth.error}
}

export default connect(mapStateToProps, {signUser})(
  reduxForm({
    form: 'signin'
  })(Signin)
)

