import React from 'react'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'

import VendorProductModalView from './VendorProductModalView'

class VendorProductModal extends React.Component {
  handleFormSubmit (values) {

  }
  render () {
    const {handleSubmit, onClickClose} = this.props
    return (
      <VendorProductModalView
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onHide={onClickClose}/>
    )
  }
}
export default connect(
  (state, props) => ({
    initialValues: props.editProduct
  })
)(reduxForm({form: 'vendorProductForm'})(VendorProductModal))
