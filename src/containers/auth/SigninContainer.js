import React, { Component } from 'react'
import Signin from '../../components/auth/Signin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signUser } from '../../actions'

@connect(
  (state) => ({
    errorMessage: state.auth.error
  }),
  dispatch => bindActionCreators({
    signUser
  })
)

export default class SigninContainer extends Component {
  constructor (props) {
    super(props)
    console.log(props)
  }
  render () {
    let { errorMessage } = this.props
    return (
      <Signin signUser={signUser} errorMessage={errorMessage} />
    )
  }
}
