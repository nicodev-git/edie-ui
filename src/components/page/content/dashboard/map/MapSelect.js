import React, { Component } from 'react'

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

  onChange (e) {
    let selectedMap = this.props.maps.filter(u => u.id === e.target.value)[0]
    this.props.changeMap(selectedMap)
  }

  loadMaps () {

  }
  render () {
    const {selectedMap} = this.props
    return (
      <select
        className="input-sm map-select margin-sm-left"
        style={{marginTop: '-9px'}}
        value={selectedMap ? selectedMap.id : ''}
        onChange={this.onChange.bind(this)}>
        {
          this.props.maps.map(map =>
            <option value={map.id} key={map.id}>
              {map.name}
            </option>
          )
        }
      </select>
    )
  }
}
