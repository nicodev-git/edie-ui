import React from 'react'
import ProductActionModalView from './ProductActionModalView'
import {connect} from "react-redux"
import {reduxForm} from 'redux-form'

class ProductActionModal extends React.Component {
  handleFormSubmit (values) {
    const {editAction} = this.props
    this.props.onSave({
      ...editAction,
      ...values
    })
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