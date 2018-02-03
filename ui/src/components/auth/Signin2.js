import React, { Component } from 'react'
import { reduxForm, Field, Form } from 'redux-form'
import {parse} from 'query-string'
import RefreshOverlay from 'components/common/RefreshOverlay'

class Signin2 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentDidUpdate (prevProps) {
    const {errorMessage} = prevProps
    if (!errorMessage && this.props.errorMessage) {
      this.setState({
        loading: false
      })
    }
  }

  handleFormSubmit ({ email, password }) {
    const { signUser, location, history } = this.props
    const params = parse(location.search)
    signUser({ email, password }, params['redirect'], history)
    this.setState({
      loading: true
    })
  }
  renderAlert () {
    let { errorMessage } = this.props
    if (errorMessage) {
      return (
        <div className="alert alert-danger">
          {errorMessage}
        </div>
      )
    }
  }

  renderInput (field) {
    return (
      <div>
        <input
          {...field.input}
          ref={null}
          className={`form-control ${field.className}`}
          type={field.type}
          placeholder={field.label}
          autoFocus={field.autoFocus}
        />
      </div>
    )
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <div className="login">
        <div className="heading">
          <h1>Incident Manager</h1>
          <p>Version 2017.2</p>
        </div>
        <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} ref="formDiv">
          <div className="box">
            New sign in box

            { this.renderAlert() }

            {this.state.loading && <RefreshOverlay/>}
          </div>
        </Form>
        <div className="copyright_text">
          Copyright 2017 SecuRegion Ltd. All Rights Reserved.
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'newsignin'
})(Signin2)
