import React from 'react'
import Modal from 'react-bootstrap-modal'
import { assign } from 'lodash'
import {reduxForm, Field} from 'redux-form'
import { connect } from 'react-redux'

class ActionModal extends React.Component {
  onHide () {

  }

  handleFormSubmit (values) {
    const {editWfAction} = this.props
    let props = assign({}, editWfAction, values)

    if (!props.name) return window.alert('Please type name.')

    this.props.onClose(props, editWfAction)
    this.onClickClose()
  }

  onClickClose () {
    this.props.closeWfActionModal()
  }

  render () {
    const {handleSubmit} = this.props
    return (
      <Modal
        show
        onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary">
        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Action
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>
        <div className="modal-body bootstrap-dialog-message">
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <div className="row margin-md-bottom">
              <label className="col-md-3">Name</label>
              <div className="col-md-9">
                <Field name="name" component="input" className="form-control"/>
              </div>
            </div>

            <div className="row margin-md-bottom">
              <label className="col-md-3">Type</label>
              <div className="col-md-9">
                <Field name="type" component="input" className="form-control"/>
              </div>
            </div>

            <div className="row margin-md-bottom">
              <label className="col-md-3">Command</label>
              <div className="col-md-9">
                <Field name="command" component="input" className="form-control"/>
              </div>
            </div>

            <div className="row margin-md-bottom">
              <label className="col-md-3">Params</label>
              <div className="col-md-9">
                <Field name="params" component="input" className="form-control"/>
              </div>
            </div>

            <div className="text-right">
              <button className="btn btn-primary btn-sm margin-sm-right" type="submit">OK</button>
              <a href="javascript:;" className="btn btn-default btn-sm" onClick={this.onClickClose.bind(this)}>Cancel</a>
            </div>
          </form>
        </div>
      </Modal>
    )
  }
}

export default connect(
  state => ({
    initialValues: state.devices.editWfAction
  })
)(reduxForm({form: 'workflowActionForm'})(ActionModal))
