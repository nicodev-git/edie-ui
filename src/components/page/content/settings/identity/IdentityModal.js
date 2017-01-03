import React from 'react'
import Modal from 'react-bootstrap-modal'
import {
    Button
} from 'react-bootstrap'
import { reduxForm, Field } from 'redux-form'
import { assign } from 'lodash'

const renderInput = field => (
    <div className="row margin-md-bottom">
        <label className="control-label col-md-3">{field.label}</label>
        <div className="col-md-9">
            <input {...field.input} type={field.type} className="form-control"/>
        </div>
    </div>
)

class IdentityModal extends React.Component { // eslint-disable-line react/no-multi-comp
  constructor (props) {
    super(props)
    this.state = {
      open: true,
      segments: [],
      loading: true
    }
  }

  onHide () {
    this.onClickClose()
  }

  closeModal (data) {
    this.props.closeIdentityModal()
  }

  onClickClose () {
    this.closeModal()
  }

  handleFormSubmit (params) {
    const props = assign({ identities: {} }, this.props.editIdentity)
    assign(props.identities, params)
    props.envvars = {}

    if (this.props.editIdentity) {
      this.props.updateIdentity(props)
    } else {
      this.props.addIdentity(props)
    }
  }

  render () {
    const { handleSubmit } = this.props

    return (
      <Modal
        show={this.state.open}
        onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >

        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Identity
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close"
              onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>

        <div className="modal-body bootstrap-dialog-message">
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <Field name="name" component={renderInput} type="text" label="Name"/>
            <Field name="desc" component={renderInput} type="text" label="Description"/>
            <Field name="ip" component={renderInput} type="text" label="IP"/>
            <Field name="segment" component={renderInput} type="text" label="Segment"/>
            <Field name="country" component={renderInput} type="text" label="Country"/>

            <div className="text-center">
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
  form: 'identityEditForm'
})(IdentityModal)
