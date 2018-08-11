import React from 'react'
import ProductTypeModalView from './ProductTypeModalView'
import {connect} from "react-redux"
import {reduxForm} from 'redux-form'

class ProductTypeModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  handleFormSubmit (values) {
    const {editType} = this.props
    this.props.onSave({
      ...editType,
      ...values
    })
  }

  render () {
    const {handleSubmit, onClose} = this.props
    return (
      <ProductTypeModalView
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onClose={onClose}
      />
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: props.editType
  })
)(reduxForm({form: 'productTypeForm'})(ProductTypeModal))