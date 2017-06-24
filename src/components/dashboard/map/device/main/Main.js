import React from 'react'

export default class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount () {
    if (!this.props.children) {
      this.props.router.replace(`${this.props.router.location.pathname}/incidents`)
    }
  }

  render () {
    return this.props.children
  }
}
