import React, { Component } from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router'

export default function (ComposedComponent) {
  class Authentication extends Component {
    componentWillMount () {
      if (!this.props.authenticated) {
        this.gotoLogin()
      }
    }

    componentWillUpdate (nextProps) {
      if (!nextProps.authenticated) {
        this.gotoLogin()
      }
    }

    gotoLogin () {
      const { location } = this.props

      const p = location.pathname
      const q = location.query
      let search = null
      if (p !== '/' && p !== '/signout') {
        search = {
          redirect: JSON.stringify({
            p, q
          })
        }
      }

      this.props.history.push({
        pathname: '/signin',
        search
      })
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

  return connect(mapStateToProps)(withRouter(Authentication))
}
