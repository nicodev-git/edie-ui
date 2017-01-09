import React from 'react'
import Modal from 'react-bootstrap-modal'
import { reduxForm, Field } from 'redux-form'

class MainWorkflowModal extends React.Component {
  onHide () {

  }

  handleFormSubmit () {

  }

  onClickClose () {

  }

  render () {
    const { handleSubmit } = this.props
    return (
      <Modal
        show={true}
        onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary">
        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Workflow
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
                <Field name="name" component="input" className="form-control" />
              </div>
            </div>

            <div className="row margin-md-bottom">
              <label className="col-md-3">Description</label>
              <div className="col-md-9">
                <Field name="desc" component="input" className="form-control" />
              </div>
            </div>

            <div className="row margin-md-bottom">
              <label className="col-md-3">Name</label>
              <div className="col-md-9">
                <Field name="name" component="input" className="form-control" />
              </div>
            </div>

            <div className="row margin-md-bottom">
              <label className="col-md-3">Present</label>
              <div className="col-md-9">
                <Field name="present" component="input" className="form-control" />
              </div>
            </div>

            <div className="row margin-md-bottom">
              <label className="col-md-3">Category</label>
              <div className="col-md-9">
                <Field name="category" component="input" className="form-control" />
              </div>
            </div>

            <div className="row margin-md-bottom">
              <label className="col-md-3">Severity</label>
              <div className="col-md-9">
                <Field name="severity" component="select" className="form-control">
                  <option>HIGH</option>
                  <option>MEDIUM</option>
                  <option>LOW</option>
                  <option>AUDIT</option>
                  <option>IGNORE</option>
                  <option>IGNOREDELETE</option>
                  <option>DEVICE</option>
                </Field>
              </div>
            </div>

            <div className="row margin-md-bottom">
              <label className="col-md-3">Enabled</label>
              <div className="col-md-9">
                <Field name="enable" component="input" type="checkbox"/>
              </div>
            </div>

            <div>
              <div className="text-right">
                <button className="btn btn-primary margin-sm-right" type="submit">OK</button>
                <a href="javascript:;" className="btn btn-default" onClick={this.onClickClose.bind(this)}>Cancel</a>
              </div>
            </div>
          </form>
        </div>
      </Modal>

    )
  }
}

export default reduxForm({form: 'workflowForm'})(MainWorkflowModal)
