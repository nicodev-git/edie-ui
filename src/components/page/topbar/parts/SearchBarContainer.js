import React, { Component } from 'react'
import SearchBar from './SearchBar'

export default class SearchBarContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: false
    }
  }

  onBackgroundChange () {
    let active = this.state.active
    this.setState({
      active: !active
    })
  }

  onEnter (e) {
    console.log('pressed')
    console.log(e.currentTarget)
  }

  render () {
    return (
      <SearchBar
        onSearch={this.onEnter.bind(this)}
        color={this.state.color}
        active={this.state.active}
        onBackgroundChange={this.onBackgroundChange.bind(this)}
      />
    )
  }
}
