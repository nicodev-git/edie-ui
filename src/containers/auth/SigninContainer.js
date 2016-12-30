import React, { Component } from 'react'
import Signin from '../../components/auth/Signin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signUser } from '../../actions'

@connect((state) => {
  return {
    errorMessage: state.auth.error
  }
},
dispatch => bindActionCreators({
  signUser
}))
export default class SigninContainer extends Component {
  getChildContext () {
    return {errorMessage: this.props.errorMessage}
  }

  render () {
    return (
      <Signin {...this.props} />
    )
  }
}

SigninContainer.childContextTypes = {
  errorMessage: React.PropTypes.string
}
// TODO: Reducer don't fires event 'connect' can't to listen it. Need to solve.
