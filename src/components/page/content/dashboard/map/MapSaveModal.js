import React from 'react'
import { MapSaveModalView } from '../../../../modal'

export default class MapSaveModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  onHide () {
    this.props.onClose &&
        this.props.onClose(this)
  }

  onClickClose () {
    this.onHide()
  }

  onClickSave () {
    let name = this.refs.name.value
    if (!name) {
      window.alert('Please input map name.')
      return
    }

    document.location.href = `${'/exportmap' + '?'}$.param({
      ${name},
      mapid: ${this.props.mapId}
    })`

    this.onHide()
  }

  render () {
    return (
      <MapSaveModalView
        show
        onHide={this.onHide.bind(this)}
        onSave={this.onClickSave.bind(this)}
        onClose={this.onClickClose.bind(this)}
      />
    )
  }
}

MapSaveModal.defaultProps = {
  onClose: null,
  mapId: ''
}
