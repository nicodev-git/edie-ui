import React from 'react'
import { withRouter } from 'react-router'

class Settings extends React.Component {
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
export default withRouter(Settings)
