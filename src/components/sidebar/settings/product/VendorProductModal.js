import React from 'react'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'

import VendorProductModalView from './VendorProductModalView'

class VendorProductModal extends React.Component {
  constructor(props) {
    super(props)

    const {editProduct} = this.props
    this.state = {
      tags: (editProduct ? editProduct.tags : []) || []
    }
  }

  handleFormSubmit (values) {
    this.props.onSave(values)
  }

  render () {
    const {handleSubmit, onClose} = this.props
    return (
      <VendorProductModalView
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onHide={onClose}/>
    )
  }
}
export default connect(
  (state, props) => ({
    initialValues: props.editProduct
  })
)(reduxForm({form: 'vendorProductForm'})(VendorProductModal))
