import React from 'react'
import ProductActionModalView from './ProductActionModalView'
import {connect} from "react-redux"
import {reduxForm} from 'redux-form'
import uuid from 'uuid'

class ProductActionModal extends React.Component {
  handleFormSubmit (values) {
    const {editAction} = this.props
    const entity = {
      ...editAction,
      ...values
    }
    if (!entity.id) entity.id = uuid()
    this.props.onSave(entity)
  }

  render () {
    const {handleSubmit, onClose} = this.props
    return (
      <ProductActionModalView
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onClose={onClose}
      />
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: props.editAction
  })
)(reduxForm({form: 'productActionForm'})(ProductActionModal))