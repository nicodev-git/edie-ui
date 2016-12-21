import React from 'react'
import Modal from 'react-bootstrap-modal'

class MapRestoreModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true
    }
  }

  render () {
    return (
            <Modal show={this.state.open} onHide={this.onHide.bind(this)}
              aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">

                <div className="modal-header">
                    <h4 className="modal-title bootstrap-dialog-title">
                        Restore Map
                    </h4>
                    <div className="bootstrap-dialog-close-button">
                        <button className="close"
                          onClick={this.onClickClose.bind(this)}>×</button>
                    </div>
                </div>

                <div className="modal-body bootstrap-dialog-message" style={{minHeight: '400px'}}>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Map Name</th>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                    </table>

                    <div className="text-center">
                        <a href="javascript:;" className="btn btn-default margin-sm">Restore</a>
                        <a href="javascript:;" className="btn btn-default" onClick={this.onClickClose.bind(this)}>Cancel</a>
                    </div>
                </div>
            </Modal>
    )
  }

  onHide () {
    this.onClickClose()
  }

  closeModal (data) {
    this.setState({
      open: false
    }, () => {
      this.props.onClose &&
            this.props.onClose(this, data)
    })
  }

  onClickClose () {
    this.closeModal()
  }
}

MapRestoreModal.defaultProps = {
  onClose: null
}

export default MapRestoreModal
