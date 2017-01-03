import React, { Component } from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux'

@connect(
  state => ({ authenticated: state.auth.authenticated })
)
export default class HeaderContainer extends Component {
  render () {
    return (
      <Header {...this.props} />
    )
  }
}
