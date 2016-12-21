import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class Header extends Component {

  renderLinks () {
    if (this.props.authenticated) {
      return (
                <li className="nav-item" >
                    <Link to="/signout" className="nnav-item">Sign Out</Link>
                </li>
      )
    }
    return [
      <Link to="/signin" className="nav-item" key={1}>Sign In</Link>,
      <Link to="/signup" className="nav-item" key={2}>Sign Up</Link>
    ]
  }

  render () {
    return (
          <nav className="navbar navbar-light">
              <Link to="/" className="navbar-brand">Agrologs</Link>
              <ul className="nav navbar-nav">
                  {this.renderLinks()}
              </ul>
          </nav>
    )
  }
}

function mapStateToProps (state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(Header)
