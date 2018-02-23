import React, { Component } from 'react'
import { MapSelectView } from './toolbar'

export default class MapSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  componentWillMount () {
    this.props.fetchMaps(true)
  }

  removeSelected () {

  }

  renameSelected (newname) {

  }

  onUserInfoLoaded () {
    this.loadMaps()
  }

  onMapAdded (map) {

  }

  onChange (selectedMap) {
    this.props.changeMap(selectedMap)
  }

  loadMaps () {

  }
  render () {
    // const {selectedMap} = this.props
    return (
      <MapSelectView
        onChange={this.onChange.bind(this)}
        maps={this.props.maps}
      />
    )
  }
}
