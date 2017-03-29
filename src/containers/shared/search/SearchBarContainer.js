import React, { Component } from 'react'
import SearchBar from 'components/shared/search/SearchBar'

export default class SearchBarContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: false
    }
  }

  onBackgroundChange () {
    let active = this.state.active
    console.log('on background change')
    this.setState({
      active: !active
    })
  }

  onEnter (e) {
    if (e.charCode === 13) {
      let value = e.currentTarget.value
      console.log('searching for...', value)
      let input = document.getElementById('searchInput')
      input.value = ''
      input.blur()
      this.props.onSearch(value)
    }
  }

  render () {
    console.log('is active? ', this.state.active)
    return (
      <SearchBar
        defaultKeyword={this.props.defaultKeyword}
        onSearch={this.onEnter.bind(this)}
        color={this.state.color}
        active={this.state.active}
        onBackgroundChange={this.onBackgroundChange.bind(this)}
      />
    )
  }
}
