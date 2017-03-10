import React, { Component } from 'react'
import SearchBar from './SearchBar'

export default class SearchBarContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      color: '#ffffff'
    }
  }

  render () {
    const { onSearch } = this.props
    return (
      <SearchBar onSearch={onSearch} color={this.state.color} />
    )
  }
}
