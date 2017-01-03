import React from 'react'

export default class Device extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount () {
    if (!this.props.selectedDevice) {
      this.props.router.replace('/')
      return
    }

    if (!this.props.children) {
      this.props.router.replace('/device/main/incidents')
    }
  }

  render () {
    if (!this.props.selectedDevice) return null
    return this.props.children
  }
}
