import React from 'react'
import { withRouter } from 'react-router'

@withRouter
export default class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount () {
    if (!this.props.children) {
      this.props.router.replace('/search/incidents')
    }
  }

  render () {
    return this.props.children
  }
}
