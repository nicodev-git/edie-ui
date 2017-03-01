import React from 'react'
import Modal from 'react-bootstrap-modal'
import { connect } from 'react-redux'
import {
  openParamEditModal,
  closeParamsModal,
  removeParam,
  updateMonitorParams
} from 'actions'

@connect(state => ({
  editParams: state.devices.editParams
}), {
  openParamEditModal,
  closeParamsModal,
  removeParam,
  updateMonitorParams
})
export default class ParamsModal extends React.Component {
  onHide () {

  }

  onClickClose () {
    this.props.closeParamsModal()
  }

  onClickAdd () {
    this.props.openParamEditModal()
  }

  onClickSave () {
    let params = {}
    this.props.editParams.forEach(p => {
      params[p.key] = p.value
    })
    this.props.updateMonitorParams(params)
  }

  onClickRemove (p) {
    this.props.removeParam(p)
  }

  render () {
    return (
      <Modal
        show onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary">
        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Params
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>
        <div className="modal-body bootstrap-dialog-message">
          <div>
            <table className="table table-hover">
              <tbody>
              {this.props.editParams.map(p =>
                <tr key={p.key}>
                  <td>{p.key}</td>
                  <td>{p.value}</td>
                  <td className="text-right">
                    <a href="javascript:;" onClick={this.onClickRemove.bind(this, p)}>
                      <i className="fa fa-trash-o"/>
                    </a>
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
          <div className="text-right p-none">
            <a href="javascript:;" className="btn btn-default btn-sm margin-sm-right"
              onClick={this.onClickAdd.bind(this)}>Add</a>

            <a href="javascript:;" className="btn btn-primary btn-sm margin-sm-right"
              onClick={this.onClickSave.bind(this)}>Save</a>
            <a href="javascript:;" className="btn btn-default btn-sm" onClick={this.onClickClose.bind(this)}>Close</a>
          </div>
        </div>
      </Modal>
    )
  }
}
