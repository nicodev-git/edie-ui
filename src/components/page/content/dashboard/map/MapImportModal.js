import React from 'react'
import { showAlert } from '../../../../shared/Alert'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { validate } from '../../../../modal/validation/NameValidation'
import { MapImportModalView } from '../../../../modal'

class MapImportModal extends React.Component {

  handleFormSubmit ({name, files}) {
    console.log('form submitting')
    console.log('name: ', name)
    console.log('file: ', files)
    this.onHide()
  }

  onHide () {
    this.props.closeMapImportModal()
  }

  onClickImport () {
    let input = this.refs.file
    const name = this.refs.name.value
    if (!name) return showAlert('Please type name.')
    if (!input.files || !input.files.length) return showAlert('Please choose map file.')

    let file = input.files[0]

    if (typeof FormData !== 'undefined') {
      let formData = new FormData() // eslint-disable-line no-undef
      formData.append('file', file, input.value.split(/(\\|\/)/g).pop())
      formData.append('name', this.refs.name.value)

      this.props.importMap(formData)
    }
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <MapImportModalView
        show={this.state.open}
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
