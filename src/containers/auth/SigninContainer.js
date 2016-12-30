import React, { Component } from 'react'
import Signin from '../../components/auth/Signin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signUser } from '../../actions'

class SigninContainer extends Component {
  getChildContext () {
    console.log(this.props)
    return {
      errorMessage: this.props.errorMessage,
      signUser: this.props.signUser,
      dispatch: this.props.dispatch
    }
  }

  render () {
    console.log(this.props)
    return (
      <Signin {...this.props} />
    )
  }
}

SigninContainer.childContextTypes = {
  errorMessage: React.PropTypes.string,
  signUser: React.PropTypes.func,
  dispatch: React.PropTypes.func
}

export default connect((state) => ({
  errorMessage: state.auth.error
}),
(dispatch) => ({
  ...bindActionCreators({ signUser }, dispatch)
}))(SigninContainer)
