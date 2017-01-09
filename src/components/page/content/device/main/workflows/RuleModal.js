import React from 'react'
import Modal from 'react-bootstrap-modal'
import {reduxForm, Field} from 'redux-form'
import { assign } from 'lodash'

class RuleModal extends React.Component {
  onHide () {

  }

  handleFormSubmit (values) {
    const {editWorkflow} = this.props
    let props = assign({}, editWorkflow, values)

    if (!props.name) return window.alert('Please type name.')

    if (editWorkflow) {
      this.props.updateDeviceWorkflow(props)
    } else {
      this.props.addDeviceWorkflow(props)
    }
  }

  onClickClose () {

  }

  render () {
    const {handleSubmit} = this.props
    return (
      <Modal
        show={true}
        onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary">
        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Rule
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>
        <div className="modal-body bootstrap-dialog-message p-none">
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

            <div className="row margin-md-bottom">
              <label className="col-md-3">Key</label>
              <div className="col-md-9">
                <Field name="key" component="input" className="form-control"/>
              </div>
            </div>

            <div className="row margin-md-bottom">
              <label className="col-md-3">Value</label>
              <div className="col-md-9">
                <Field name="value" component="input" className="form-control"/>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    )
  }
}

export default reduxForm({form: 'workflowRuleForm'})(RuleModal)
