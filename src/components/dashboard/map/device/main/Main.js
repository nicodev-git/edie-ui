import React from 'react'
import {withRouter} from 'react-router'

class Main extends React.Component {
  componentWillMount () {
    if (!this.props.children) {
      this.props.history.replace(`${this.props.location.pathname}/incidents`)
    }
  }

  render () {
    return null
  }
}

export default withRouter(Main)
