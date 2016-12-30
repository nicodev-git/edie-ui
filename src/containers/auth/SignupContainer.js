import React, { Component } from 'react'
import Signup from '../../components/auth/Signup'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signup } from '../../actions'

@connect((state) => {
  return {
    errorMessage: state.auth.error
  }
},
dispatch => bindActionCreators({
  signup
}))
export default class SignupContainer extends Component {
  getChildContext () {
    return {errorMessage: this.props.errorMessage}
  }

  render () {
    return (
      <Signup {...this.props} />
    )
  }
}

SignupContainer.childContextTypes = {
  errorMessage: React.PropTypes.string
}
