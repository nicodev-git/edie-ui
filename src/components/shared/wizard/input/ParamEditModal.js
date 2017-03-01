import React from 'react'
import Modal from 'react-bootstrap-modal'
import {reduxForm, Field} from 'redux-form'
import {connect} from 'react-redux'
import {assign} from 'lodash'
import {
  closeParamEditModal,
  updateParam,
  addParam
} from 'actions'

const defaultKeys = [
  'port', 'user', 'password', 'hostname'
]

@connect(state => ({
  initialValues: state.devices.editParam,
  editParam: state.devices.editParam
}), {
  closeParamEditModal,
  updateParam,
  addParam
})
@reduxForm({form: 'monitorParamEdit'})
export default class ParamEditModal extends React.Component {
  onHide () {

  }

  onClickClose () {
    this.props.closeParamEditModal()
  }

  onClickAdd () {

  }

  onClickDefaultKey (key) {
    this.props.change('key', key)
  }

  handleFormSubmit (props) {
    const param = assign({}, this.props.editParam, props)
    if (this.props.editParam) {
      this.props.updateParam(param)
    } else {
      this.props.addParam(param)
    }
  }

  render () {
    const {handleSubmit} = this.props
    return (
      <Modal
        show onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary">
        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Param
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>
        <div className="modal-body bootstrap-dialog-message">
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <div className="margin-md-bottom">
              {defaultKeys.map(k =>
                <a href="javascript:" key={k} className="btn btn-sm btn-default margin-sm-right"
                  onClick={this.onClickDefaultKey.bind(this, k)}>{k}</a>
              )}
            </div>
            <div className="row margin-md-bottom">
              <label className="col-md-3">Key</label>
              <div className="col-md-9">
                <Field name="key" className="form-control" component="input" type="text"/>
              </div>
            </div>

            <div className="row margin-md-bottom">
              <label className="col-md-3">Value</label>
              <div className="col-md-9">
                <Field name="value" className="form-control" component="input" type="text"/>
              </div>
            </div>

            <div className="text-right p-none">
              <button action="submit" className="btn btn-primary btn-sm margin-sm-right">Save</button>
              <a href="javascript:;" className="btn btn-default btn-sm" onClick={this.onClickClose.bind(this)}>Close</a>
            </div>
          </form>
        </div>
      </Modal>
    )
  }
}
