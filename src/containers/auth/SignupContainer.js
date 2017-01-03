import React, { Component } from 'react'
import Signup from '../../components/auth/Signup'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signup } from '../../actions'

@connect(
  state => ({ errorMessage: state.auth.error }),
  dispatch => ({
    signup: bindActionCreators(signup, dispatch)
  })
)
export default class SignupContainer extends Component {
  render () {
    return (
      <Signup {...this.props} />
    )
  }
}
