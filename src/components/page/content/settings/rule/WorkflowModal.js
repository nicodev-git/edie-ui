import React from 'react'
import Modal from 'react-bootstrap-modal'
import {
    Button
} from 'react-bootstrap'
import { reduxForm, Field } from 'redux-form'
import { assign } from 'lodash'
import { showAlert } from '../../../../shared/Alert'

const renderInput = field => (
    <div className="row margin-md-bottom">
        <label className={`col-md-3 ${field.type === 'checkbox' ? '' : 'control-label'}`}>{field.label}</label>
        <div className="col-md-9">
            <input {...field.input} type={field.type} className={field.type === 'text' ? 'form-control' : ''}/>
        </div>
    </div>
)

class WorkflowModal extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  onHide () {
    this.onClickClose()
  }

  closeModal () {
    this.props.closeWorkflowModal()
  }

  onClickClose () {
    this.closeModal()
  }

  handleFormSubmit (values) {
    const { editWorkflow } = this.props

    let props = assign({}, editWorkflow, values)

    if (!props.name) return showAlert('Please type name.')

    if (editWorkflow) {
      this.props.updateWorkflow(props)
    } else {
      this.props.addWorkflow(props)
    }
  }

  render () {
    const { handleSubmit } = this.props

    return (
      <Modal
        show
        onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >

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
            <Field name="name" component={renderInput} type="text" label="Name"/>
            <Field name="desc" component={renderInput} type="text" label="Description"/>
            <Field name="display_incident_desc" component={renderInput} type="text" label="Display Incident Description"/>
            <Field name="isGlobal" component={renderInput} type="checkbox" label="Global"/>

            <div className="text-right">
              <Button className="btn-primary btn-sm" type="submit">Save</Button>
              <Button className="btn-sm margin-sm-left"
                onClick={this.onClickClose.bind(this)}>Cancel</Button>
            </div>
          </form>
        </div>
      </Modal>
    )
  }
}

export default reduxForm({
  form: 'workflowEditForm'
})(WorkflowModal)
