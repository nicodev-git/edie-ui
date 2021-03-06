import React from 'react'
import {connect} from "react-redux"
import {reduxForm, getFormValues} from 'redux-form'

import ProductVendorPickModalView from './ProductVendorPickModalView'

class ProductVendorPickModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  handleFormSubmit (values) {
    if (values.addType === 'new')
      this.props.onAdd(values)
    else {
      const {existingId} = this.props.allValues || {}
      if (!existingId) return window.alert('Please choose one')
      this.props.onPick(existingId)
    }
  }

  onChooseExisting () {

  }

  render () {
    const {handleSubmit, onClose, productVendors} = this.props
    return (
      <ProductVendorPickModalView
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onClose={onClose}

        productVendors={productVendors}
        onChooseExisting={this.onChooseExisting.bind(this)}
      />
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: {
      addType: 'new'
    },
    allValues: getFormValues('productVendorPickForm')(state)
  })
)(reduxForm({form: 'productVendorPickForm'})(ProductVendorPickModal))