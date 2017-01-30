import React from 'react'
import Modal from 'react-bootstrap-modal'
import { assign } from 'lodash'
import { connect } from 'react-redux'
import {reduxForm, Field} from 'redux-form'

class CategoryModal extends React.Component {
  onHide () {

  }

  handleFormSubmit (values) {
    const {editWfCategory} = this.props
    let props = assign({}, editWfCategory, values)

    if (!props.name) return window.alert('Please type name.')

    if (editWfCategory) {

    } else {
      this.props.addWfCategory(props)
    }
  }

  onClickClose () {
    this.props.closeWfCategoryModal()
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
            Category
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
              <label className="col-md-3">Description</label>
              <div className="col-md-9">
                <Field name="desc" component="input" className="form-control"/>
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
    initialValues: state.devices.editWfCategory
  })
)(reduxForm({form: 'workflowCategoryForm'})(CategoryModal))
