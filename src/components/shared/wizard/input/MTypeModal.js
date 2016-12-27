import React from 'react'
import Modal from 'react-bootstrap-modal'
import {commonconfig} from '../../../shared/wizard/WizardConfig'

export default class MTypeModal extends React.Component {
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
    let item = this.props.item || {
      result: ''
    }

    item.number = this.props.number
    item.value = this.refs.type.value

    this.onHide(item)
  }

  render () {
    return (
      <Modal show={this.state.open} onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">

        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Type
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>

        <div className="modal-body bootstrap-dialog-message">
          <div className="row margin-md-bottom">
            <label className="col-md-2 control-label">M{this.props.number}</label>
            <div className="col-md-10">
              <select className="form-control valid" ref="type"
                defaultValue={this.props.item ? this.props.item.value : 'Not Used'}>
                {
                  commonconfig.m1.values.map((item, i) =>
                    <option key={i} value={item.value}>{item.display}</option>
                  )
                }
              </select>
            </div>
          </div>

          <div className="text-right">
            <a href="javascript:;" className="btn btn-primary btn-sm" onClick={this.onClickSave.bind(this)}>Save</a>
            <a href="javascript:;" className="btn btn-default btn-sm" onClick={this.onClickClose.bind(this)}>Close</a>
          </div>
        </div>
      </Modal>
    )
  }
}

MTypeModal.defaultProps = {
  onClose: null,

  number: 1,
  item: null
}
