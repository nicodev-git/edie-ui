import React, { Component } from 'react'
import { connect } from 'react-redux'

export default function (ComposedComponent) {
  class Authentication extends Component {

    componentWillMount () {
      if (!this.props.authenticated) {
        this.context.router.push('/signin')
      }
    }

    componentWillUpdate (nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/signin')
      }
    }

    render () {
      if (!this.props.authenticated) return null
      return <ComposedComponent {...this.props} />
    }
  }

  Authentication.contextTypes = {
    router: React.PropTypes.object
  }

  function mapStateToProps (state) {
    return { authenticated: state.auth.authenticated }
  }

  return connect(mapStateToProps)(Authentication)
}
