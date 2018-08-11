import React from 'react'
import {connect} from "react-redux"
import {reduxForm} from 'redux-form'

import ProductVendorModalView from './ProductVendorModalView'

class ProductVendorPickModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  handleFormSubmit (values) {
    this.props.onSave(values)
  }

  onChooseExisting () {

  }

  render () {
    const {handleSubmit, onClose} = this.props
    return (
      <ProductVendorModalView
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onClose={onClose}

        onChooseExisting={this.onChooseExisting.bind(this)}
      />
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: props.editVendor
  })
)(reduxForm({form: 'productVendorPickForm'})(ProductVendorPickModal))