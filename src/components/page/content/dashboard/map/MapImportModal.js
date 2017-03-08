import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { validate } from '../../../../modal/validation/NameValidation'
import { MapImportModalView } from '../../../../modal'

class MapImportModal extends React.Component {

  handleFormSubmit ({name, files}) {
    console.log('form submitting')
    console.log('name: ', name)
    console.log('file: ', files)
    this.onClickImport(name, files[0])
    this.onHide()
  }

  onHide () {
    this.props.closeMapImportModal()
  }

  onClickImport (name, file) {
    if (typeof FormData !== 'undefined') {
      let formData = new FormData() // eslint-disable-line no-undef
      // formData.append('file', file, input.value.split(/(\\|\/)/g).pop()) what does this regex do?
      formData.append('file', file, file.name)
      formData.append('name', name)
      this.props.importMap(formData)
    }
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <MapImportModalView
        show={this.props.open}
        onHide={this.onHide.bind(this)}
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
      />
    )
  }
}

export default connect(
  state => ({
    open: true,
    fileName: ''
  }), {})(reduxForm({
    form: 'mapImportModal',
    validate
  })(MapImportModal))
