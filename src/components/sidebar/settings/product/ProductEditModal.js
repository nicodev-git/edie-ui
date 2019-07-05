import React from 'react'
import {connect} from "react-redux"
import {reduxForm} from 'redux-form'

import ProductEditModalView from './ProductEditModalView'

class ProductEditModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  handleFormSubmit (values) {
    const {editProduct} = this.props
    this.props.onSave({
      ...editProduct,
      ...values
    })
  }

  render () {
    const {handleSubmit, onClose} = this.props
    return (
      <ProductEditModalView
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onClose={onClose}
      />
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: props.editProduct
  })
)(reduxForm({form: 'productEditForm'})(ProductEditModal))