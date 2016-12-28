import React from 'react'
import Modal from 'react-bootstrap-modal'
import { showAlert } from '../../../../../shared/Alert'
import { ROOT_URL } from '../../../../../../actions/config'

export default class IgnoreRuleEditModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: props.open
    }
  }

  openModal () {
    this.setState({
      open: true
    })
  }

  onHide (success) {
    this.setState({
      open: false
    }, () => {
      this.props.onClose &&
            this.props.onClose(this, success)
    })
  }

  onClickClose () {
    this.onHide()
  }

  onClickSave () {
    $.get(`${ROOT_URL}${Api.rule.updateARuleToADevice}`, { // eslint-disable-line no-undef
      deviceid: this.props.device.id,
      idrulesNew: this.props.rule.idrulesNew,
      ruleCategory: this.props.categoryId,
      name: this.refs.name.value,
      filter1: this.refs.filter.value,
      severity: this.refs.severity.value
    }).done(() => {
      this.onHide(true)
    }).fail(function (res) {
      showAlert('Failed to save.')
    })
  }

  render () {
    let rule = this.props.rule

    return (
      <Modal
        show={this.state.open}
        onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >
        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Rule
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>
        <div className="modal-body bootstrap-dialog-message">
          <div className="row margin-md-bottom">
            <div className="col-md-12">
              <label className="control-label message-label" />
            </div>
          </div>

          <div className="row margin-md-bottom">
            <label className="col-md-3 control-label">Severity</label>
            <div className="col-md-9">
              <select className="form-control" ref="severity" defaultValue={rule.severity}>
                <option value="Ignore">Ignore</option>
                <option value="IgnoreDelete">Ignore Delete</option>
              </select>
            </div>
          </div>

          <div className="row margin-md-bottom">
            <label className="col-md-3 control-label">Name</label>
            <div className="col-md-9">
              <input type="text" className="form-control" ref="name" defaultValue={rule.name}/>
            </div>
          </div>

          <div className="row margin-md-bottom">
            <label className="col-md-3 control-label">Filter</label>
            <div className="col-md-9">
              <input type="text" className="form-control" ref="filter" defaultValue={rule.prefilter1}/>
            </div>
          </div>

          <div className="text-right">
            <a href="javascript:;" className="btn btn-primary btn-sm" onClick={this.onClickSave.bind(this)}>Save</a>
            <a href="javascript:;" className="btn btn-default btn-sm" onClick={this.onClickClose.bind(this)}>Cancel</a>
          </div>
        </div>
      </Modal>
    )
  }
}

IgnoreRuleEditModal.defaultProps = {
  open: false,

  rule: {},
  device: {},
  categoryId: 0,

  onClose: null
}
