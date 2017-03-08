import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { MapSaveModalView } from '../../../../modal'
import { validate } from '../../../../modal/validation/NameValidation'

class MapSaveModal extends Component {
  handleFormSubmit ({name, description}) {
    console.log('form submitting')
    console.log('name: ', name)
    console.log('description: ', description)
    this.onHide()
  }

  onHide () {
    this.props.onClose &&
        this.props.onClose(this)
  }

  onClickSave () {
    /* let name = this.refs.name.value
    if (!name) {
      window.alert('Please input map name.')
      return
    }

    document.location.href = `${'/exportmap' + '?'}$.param({
      ${name},
      mapid: ${this.props.mapId}
    })` */

    this.onHide()
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <MapSaveModalView
        show
        onHide={this.onHide.bind(this)}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
      />
    )
  }
}

export default connect(
  state => ({}), {})(reduxForm({
    form: 'mapSaveModal',
    validate
  })(MapSaveModal))
