import React, { Component } from 'react'
import Signout from '../../components/auth/Signout'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signOut } from '../../actions'

@connect((state) => {
  return {
    errorMessage: state.auth.error
  }
},
dispatch => bindActionCreators({
  signOut
}))
export default class SignoutContainer extends Component {
  render () {
    return (
      <Signout {...this.props} />
    )
  }
}
