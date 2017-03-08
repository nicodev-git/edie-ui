import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { MapSaveModalView } from '../../../../modal'
import { validate } from '../../../../modal/validation/NameValidation'

class MapSaveModal extends React.Component {

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

  onClickSave (name) {
    // TODO
    document.location.href = `${'/exportmap' + '?'}$.param({
      ${name},
      mapid: ${this.props.mapId}
    })`
    this.onHide()
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <MapSaveModalView
        show={this.props.open}
        onHide={this.onHide.bind(this)}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
      />
    )
  }
}

export default connect(
  state => ({
    open: true
  }), {})(reduxForm({
    form: 'mapSaveModal',
    validate
  })(MapSaveModal))
