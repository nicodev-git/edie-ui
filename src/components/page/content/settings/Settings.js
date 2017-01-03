import React from 'react'
import { withRouter } from 'react-router'

@withRouter
export default class Settings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    if (!this.props.children) {
      this.props.router.replace('/settings/general')
    }
  }

  render () {
    return this.props.children
  }
}
