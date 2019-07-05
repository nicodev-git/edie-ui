import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { signRefresh } from 'actions'

export default function (ComposedComponent) {
  class Authentication extends Component {
    componentWillMount () {
      if (!this.props.authenticated && !sessionStorage.token) {        
        this.gotoLogin()
      } else if (!this.props.authenticated && sessionStorage.token) {
        this.refresh()
      }
    }

    componentWillUpdate (nextProps) {      
      if (!nextProps.authenticated && !sessionStorage.token) {
        this.gotoLogin()
      }
    }

    refresh() {
      const { location, dispatch, history } = this.props
      let token = sessionStorage.token;
      dispatch(signRefresh(token, location, history));
    }

    gotoLogin () {
      const { location } = this.props

      const p = location.pathname
      const q = location.search
      let search = null
      if (p !== '/' && p !== '/signout') {
        const redirect = JSON.stringify({
          p, q
        })
        search = `?redirect=${encodeURIComponent(redirect)}`
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

  return connect(state => ({
    authenticated: state.auth.authenticated
  }))(withRouter(Authentication))
}
