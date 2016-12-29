import React, { Component } from 'react'
import Signin from '../../components/auth/Signin'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { signUser } from '../../actions'

const renderInput = field =>   // Define stateless component to render input and errors
  <div>
    <input className={`form-control ${field.className}`} {...field.input}
       type={field.type}
       placeholder={field.label} />
  </div>

export default class SigninContainer extends Component { // eslint-disable-line react/no-multi-comp

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

@connect((state) => ({
  errorMessage: state.auth.error
}),
(dispatch) => bindActionCreators({
  signUser
}))
