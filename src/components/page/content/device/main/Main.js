import React from 'react'
import {withRouter, Link} from 'react-router'

class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount () {
    if (!this.props.children) {
      this.props.router.replace('/device/main/incidents')
    }
  }

  render () {
    return this.props.children
  }
}

export default withRouter(Main)
