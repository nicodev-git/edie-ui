import React, { Component } from 'react'

class Dashboard extends Component {
  renderMessage () {
    if (this.props.message) {
      return (
        <div>
          <h3>This is the secured Dashboard!</h3>
          <strong>{this.props.message}</strong>
        </div>
      )
    }
  }

  render () {
    return (
      <div>
        This is a feature
        {this.renderMessage()}
      </div>
    )
  }
}

export default Dashboard

