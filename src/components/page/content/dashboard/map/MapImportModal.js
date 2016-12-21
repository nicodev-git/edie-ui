import React from 'react'
import Modal from 'react-bootstrap-modal'
import {connect} from 'react-redux'

import { importMap, closeMapImportModal } from '../../../../../actions'
import { showAlert } from '../../../../shared/Alert'

class MapImportModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true,
      fileName: ''
    }
  }

  render () {
    return (
            <Modal show={this.state.open} onHide={this.onHide.bind(this)}
              aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">

                <div className="modal-header">
                    <h4 className="modal-title bootstrap-dialog-title">
                        Import Map
                    </h4>
                    <div className="bootstrap-dialog-close-button">
                        <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
                    </div>
                </div>

                <div className="modal-body bootstrap-dialog-message">
                    <div className="row margin-md-bottom">
                        <label className="control-label col-md-3 padding-sm-top text-right">File: </label>
                        <div className="col-md-8 padding-sm-top">

                            <a href="javascript:;" style={{position: 'relative', cursor: 'pointer'}}>
                                Choose File
                                <input type="file" name="file" ref="file"
                                  onChange={this.onChangeFile.bind(this)}
                                  style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    margin: 0,
                                    padding: 0,
                                    fontSize: '20px',
                                    cursor: 'pointer',
                                    opacity: 0
                                  }}
                                />
                            </a>
                            <span className="margin-md-left">{this.state.fileName}</span>
                        </div>
                    </div>

                    <div className="row margin-md-bottom">
                        <label className="control-label col-md-3 padding-sm-top text-right">Name:</label>
                        <div className="col-md-8">
                            <input type="text" className="form-control" ref="name"/>
                        </div>
                    </div>

                    <div className="text-center mb-none">
                        <a href="javascript:;" className="btn btn-default btn-sm margin-sm-right"
                          onClick={this.onClickImport.bind(this)}>Import</a>
                        <a href="javascript:;" className="btn btn-default btn-sm"
                          onClick={this.onClickClose.bind(this)}>Cancel</a>
                    </div>
                </div>
            </Modal>
    )
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

    let formData = new FormData()
    formData.append('file', file, input.value.split(/(\\|\/)/g).pop())
    formData.append('name', this.refs.name.value)

    this.props.importMap(formData)
  }
}

MapImportModal.defaultProps = {

}

function mapStateToProps () {
  return {}
}

export default connect(mapStateToProps, { importMap, closeMapImportModal })(MapImportModal)
