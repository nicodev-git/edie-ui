import React from 'react'
import Modal from 'react-bootstrap-modal'

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
      <Modal
        show
        onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >

        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Export Map
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>

        <div className="modal-body bootstrap-dialog-message">
          <div className="row margin-md-bottom">
            <label className="control-label col-md-2 padding-sm-top">Name</label>
            <div className="col-md-10">
              <input type="text" className="form-control" ref="name" />
            </div>
          </div>

          <div className="row margin-md-bottom hidden">
            <label className="control-label col-md-3 padding-sm-top text-right">Description</label>
            <div className="col-md-9">
              <input type="text" className="form-control"/>
            </div>
          </div>

          <div className="text-right p-none">
            <a href="javascript:;" className="btn btn-primary btn-sm margin-sm-right" onClick={this.onClickSave.bind(this)}>Save</a>
            <a href="javascript:;" className="btn btn-default btn-sm" onClick={this.onClickClose.bind(this)}>Cancel</a>
          </div>
        </div>
      </Modal>
    )
  }
}

MapSaveModal.defaultProps = {
  onClose: null,
  mapId: ''
}
