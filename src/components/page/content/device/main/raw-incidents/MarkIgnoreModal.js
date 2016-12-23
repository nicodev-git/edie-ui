import React from 'react'
import Modal from 'react-bootstrap-modal'

export default class MarkIgnoreModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true
    }
  }

  onHide (data) {
    this.setState({
      open: false
    }, () => {
      this.props.onClose &&
            this.props.onClose(this, data)
    })
  }

  onClickClose () {
    this.onHide()
  }

  onClickSave () {
    $.get(Api.rule.addIgnoreRuleForDevice, { // eslint-disable-line no-undef
      deviceid: this.props.device.id,
      name: this.refs.name.value,
      filter: this.refs.filter.value,
      severity: this.refs.severity.value
    }).done(res => {
      this.onHide(true)
    }).fail(() => {

    })
  }

  render () {
    return (
      <Modal
        show={this.state.open}
        onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >
        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Mark as ignored
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>
        <div className="modal-body bootstrap-dialog-message">
          <div className="row margin-md-bottom">
            <div className="col-md-12">
              <label className="control-label">{this.props.message}</label>
            </div>
          </div>

          <div className="row margin-md-bottom">
            <label className="col-md-3 control-label">Severity</label>
            <div className="col-md-9">
              <select className="form-control" ref="severity">
                <option value="Ignore">Ignore</option>
                <option value="IgnoreDelete">Ignore Delete</option>
              </select>
            </div>
          </div>

          <div className="row margin-md-bottom">
            <label className="col-md-3 control-label">Name</label>
            <div className="col-md-9">
              <input type="text" className="form-control" ref="name" />
            </div>
          </div>

          <div className="row margin-md-bottom">
            <div className="col-md-3">
              <label className="control-label margin-sm-top">Filter</label>
            </div>
            <div className="col-md-9">
              <input type="text" className="form-control" ref="filter"/>
            </div>
          </div>
          <div className="text-right mb-none">
            <a href="javascript:;" className="btn btn-primary btn-sm" onClick={this.onClickSave.bind(this)}>Save</a>
            <a href="javascript:;" className="btn btn-default btn-sm margin-sm-left" onClick={this.onClickClose.bind(this)}>Cancel</a>
          </div>
        </div>
      </Modal>
    )
  }
}

MarkIgnoreModal.defaultProps = {
  message: '',
  device: {},

  onClose: null
}
