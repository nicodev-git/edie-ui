import React from 'react'
import {connect} from "react-redux"
import {reduxForm} from 'redux-form'

import ProductVendorModalView from './ProductVendorModalView'

class ProductVendorModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  handleFormSubmit (values) {
    const {editVendor} = this.props
    this.props.onSave({
      ...editVendor,
      ...values
    })
  }

  render () {
    const {handleSubmit, onClose} = this.props
    return (
      <ProductVendorModalView
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onClose={onClose}
      />
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: props.editVendor
  })
)(reduxForm({form: 'productVendorForm'})(ProductVendorModal))