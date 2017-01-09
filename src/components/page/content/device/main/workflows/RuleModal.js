import React from 'react'
import Modal from 'react-bootstrap-modal'
import {reduxForm, Field} from 'redux-form'
import { assign } from 'lodash'

class RuleModal extends React.Component {
  onHide () {

  }

  handleFormSubmit (values) {
    const {editRule} = this.props
    let props = assign({}, editRule, values)

    if (!props.key) return window.alert('Please type key.')

    this.props.onClose(props, editRule)
    this.props.closeDeviceRuleModal()
  }

  onClickClose () {
    this.props.closeDeviceRuleModal()
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
        <div className="modal-body bootstrap-dialog-message">
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

export default reduxForm({form: 'workflowRuleForm'})(RuleModal)
