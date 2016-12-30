import React, { Component } from 'react'
import Signin from '../../components/auth/Signin'
import { connect } from 'react-redux'
import { signUser } from '../../actions'

class SigninContainer extends Component {
  render () {
    return (
      <Signin {...this.props} />
    )
  }
}

export default connect(
  state => ({ errorMessage: state.auth.error }),
  dispatch => {
    return {
      signUser: ({email, password}) => {
        dispatch(signUser({email, password}))
      }
    }
  }
)(SigninContainer)
