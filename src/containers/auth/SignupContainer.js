import React, { Component } from 'react'
import Signup from '../../components/auth/Signup'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signup } from '../../actions'

class SignupContainer extends Component {
  render () {
    return (
      <Signup {...this.props} />
    )
  }
}

export default connect(
  state => ({ errorMessage: state.auth.error }),
  dispatch => {
    return {
      signup: bindActionCreators(signup, dispatch)
    }
  }
)(SignupContainer)
