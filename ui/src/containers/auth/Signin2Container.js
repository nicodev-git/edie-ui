import React, { Component } from 'react'
import Signin2 from 'components/auth/Signin2'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signUser } from 'actions'

class SigninContainer extends Component {
  render () {
    return (
      <Signin2 {...this.props} />
    )
  }
}
export default connect(
  state => ({ errorMessage: state.auth.error }),
  dispatch => ({
    signUser: bindActionCreators(signUser, dispatch)
  })
)(SigninContainer)
