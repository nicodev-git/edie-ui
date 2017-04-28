import React, { Component } from 'react'
import SimpleModalContainer from 'containers/modal/SimpleModalContainer'
import { validate } from '../../../../modal/validation/NameValidation'

export default class MapImportModal extends Component {
  doAction (values) {
    console.log('doing some action when form submitted')
    console.log(values)
    if (typeof FormData !== 'undefined') {
      let formData = new FormData() // eslint-disable-line no-undef
      // formData.append('file', file, input.value.split(/(\\|\/)/g).pop()) what does this regex do?
      formData.append('file', values.file, values.file.name)
      formData.append('name', values.name)
      this.props.importMap(formData)
    }
  }

  render () {
    let header = 'Import Map'
    let content = [
      {name: 'Name'}
    ]
    return (
      <SimpleModalContainer
        header={header}
        content={content}
        doAction={this.doAction.bind(this)}
        onClose={this.props.closeMapImportModal}
        validate={validate}
        fileUpload
      />
    )
  }
}
