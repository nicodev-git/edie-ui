import React from 'react'
import ProductTypeModalView from './ProductTypeModalView'
import {connect} from "react-redux"
import {reduxForm} from 'redux-form'

class ProductTypeModal extends React.Component {
  constructor(props) {
    super(props)

    const {editType} = props
    this.state = {
      actions: (editType ? editType.actions : []) || []
    }
  }

  handleFormSubmit (values) {
    const {editType} = this.props
    this.props.onSave({
      ...editType,
      ...values
    })
  }

  onClickAddAction () {

  }

  onClickEditAction () {

  }

  onClickDeleteAction () {

  }

  render () {
    const {handleSubmit, onClose} = this.props
    return (
      <ProductTypeModalView
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onClose={onClose}

        actions={this.state.actions}
        onClickAddAction={this.onClickAddAction.bind(this)}
        onClickEditAction={this.onClickEditAction.bind(this)}
        onClickDeleteAction={this.onClickDeleteAction.bind(this)}
      />
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: props.editType
  })
)(reduxForm({form: 'productTypeForm'})(ProductTypeModal))