import React, { Component } from 'react'
import Dashboard from '../components/Dashboard'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { fetchMessage } from '../actions'

export default class DashboardContainer extends Component {
  componentWillMount () {
    this.props.fetchMessage()
  }

  render () {
    return (
      <Dashboard message={this.props.message} />
    )
  }
}

function mapStateToProps (state) {
  return {}
}

@connect(state => ({
  message: state.auth.message
}),
(dispatch) => bindActionCreators({
  fetchMessage
}))
