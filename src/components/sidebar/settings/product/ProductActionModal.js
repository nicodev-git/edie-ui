import React from 'react'
import ProductTypeModalView from './ProductTypeModalView'
import {connect} from "react-redux"
import {reduxForm} from 'redux-form'

class ProductActionModal extends React.Component {
  constructor(props) {
    super(props)

    const {editType} = props
    this.state = {
      actions: (editType ? editType.actions : []) || []
    }
  }

  handleFormSubmit (values) {
    const {editType} = this.props
    const {actions} = this.state
    this.props.onSave({
      ...editType,
      ...values,
      actions
    })
  }

  onClickAddAction () {
    const action = window.prompt('Please type action')
    if (!action) return
    const {actions} = this.state
    this.setState({
      actions: [...actions, action]
    })
  }

  onClickEditAction (index) {
    const {actions} = this.state
    const action = window.prompt('Please type action', actions[index])
    if (!action) return
    this.setState({
      actions: actions.map((p, i) => i === index ? action : p)
    })
  }

  onClickDeleteAction (index) {
    const {actions} = this.state
    if (!window.confirm('Click OK to delete')) return
    this.setState({
      actions: actions.filter((p, i) => i !== index)
    })
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
    initialValues: props.editAction
  })
)(reduxForm({form: 'productActionForm'})(ProductActionModal))