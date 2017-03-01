import React from 'react'
import { showAlert } from '../../../../shared/Alert'
import { MapImportModalView } from '../../../../modal'

export default class MapImportModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true,
      fileName: ''
    }
  }

  onHide () {
    this.props.closeMapImportModal()
  }

  onClickClose () {
    this.onHide()
  }

  onChangeFile (e) {
    let input = e.target

    let fileName = input.value.split(/(\\|\/)/g).pop()

    this.setState({fileName})
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
    return (
      <MapImportModalView
        show={this.state.open}
        onHide={this.onHide.bind(this)}
        onChange={this.onChangeFile.bind(this)}
        fileName={this.state.fileName}
        onImport={this.onClickImport.bind(this)}
        onClose={this.onClickClose.bind(this)}
      />
    )
  }
}
