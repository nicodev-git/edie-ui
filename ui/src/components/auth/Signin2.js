import React, { Component } from 'react'
import { reduxForm, Field, Form } from 'redux-form'
import {parse} from 'query-string'
import {RaisedButton} from 'material-ui'

import RefreshOverlay from 'components/common/RefreshOverlay'
import { FormInput } from 'components/modal/parts'

const boxStyle = {
  margin: '50px auto',
  background: 'white',
  width: 300,
  height: 300,
  borderRadius: 10,
  border: '1px solid #414345',
  textAlign: 'center',
  position: 'relative'
}

class Signin2 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      page: 1
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

  onClickNext () {
    this.setState({
      page: this.state.page + 1
    })
  }

  onClickPrev () {
    this.setState({
      page: this.state.page - 1
    })
  }

  onKeyDown (e) {
    if (e.keyCode === 13) {
      e.preventDefault()

      if (this.state.page === 1) this.onClickNext()
      else this.onClickPrev()
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

  renderPage () {
    const { page } = this.state

    if (page === 1) {
      return (
        <div>
          <Field name="email" component={FormInput} type="text" floatingLabel="User Name" autoFocus
                 onKeyDown={this.onKeyDown.bind(this)}/>
          <RaisedButton label="Next" primary className="margin-lg-top" onTouchTap={this.onClickNext.bind(this)}/>
        </div>
      )
    } else {
      return (
        <div>
          <Field name="password" component={FormInput} type="password" floatingLabel="Password" autoFocus/>
          <RaisedButton label="Prev" className="margin-lg" primary onTouchTap={this.onClickPrev.bind(this)}/>
          <RaisedButton label="Login" primary className="margin-lg" type="submit"/>
        </div>
      )
    }
  }

  render () {
    const { handleSubmit } = this.props

    return (
      <div className="login">
        <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} ref="formDiv">
          <div style={boxStyle}>
            <h3 className="margin-xl-bottom text-center" style={{fontSize: '31px'}}>Login</h3>

            {this.renderPage()}

            { this.renderAlert() }

            {this.state.loading && <RefreshOverlay/>}
          </div>
        </Form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'newsignin'
})(Signin2)
