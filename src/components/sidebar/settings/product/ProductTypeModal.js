import React from 'react'
import ProductTypeModalView from './ProductTypeModalView'
import {connect} from "react-redux"
import {reduxForm} from 'redux-form'
import ProductActionModal from './ProductActionModal'

class ProductTypeModal extends React.Component {
  constructor(props) {
    super(props)

    const {editType} = props
    this.state = {
      addedAuction: [],
      actionModalOpen: false,
      editAction: null,
      actions: (editType ? editType.actions : []) || [],
      grokFields: (editType ? editType.grokFields : []) || [],
    }
  }

  handleFormSubmit (values) {
    const {editType} = this.props
    const {actions, grokFields} = this.state
    this.props.onSave({
      ...editType,
      ...values,
      actions,
      grokFields
    })
  }

  onClickAddAction () {
    this.setState({
      actionModalOpen: true,
      editAction: null
    })
  }
  // onClickEmptyAddAction () {

  // }
  onClickEditAction (index) {
    this.setState({
      actionModalOpen: true,
      editAction: this.state.actions[index]
    })
  }

  onClickDeleteAction (index) {
    const {actions} = this.state
    if (!window.confirm('Click OK to delete')) return
    this.setState({
      actions: actions.filter((p, i) => i !== index)
    })
  }

  ////////////////////////////////////////////////////

  onSaveAction (entity) {
    const {actions, editAction} = this.state
    if (editAction) {
      const index = actions.indexOf(editAction)
      this.setState({
        actions: actions.map((p, i) => i === index ? entity : p)
      })
    } else {
      this.setState({
        actions: [...actions, entity]
      })
    }
    this.onCloseActionModal()
  }

  onCloseActionModal () {
    this.setState({
      actionModalOpen: false
    })
  }

  ////////////////////////////////////////////////////

  onClickAddGrokField () {
    const name = prompt('Please type grok field', '')
    if (!name) return

    const {grokFields} = this.state
    this.setState({
      grokFields: [...grokFields, name]
    })
  }

  onClickEditGrokField (index) {
    const {grokFields} = this.state
    const name = prompt('Please type grok field', grokFields[index])
    if (!name) return

    this.setState({
      grokFields: grokFields.map((p, i) => i === index ? name : p)
    })
  }

  onClickDeleteGrokField (index) {
    const {grokFields} = this.state
    if (!window.confirm('Click OK to delete')) return
    this.setState({
      grokFields: grokFields.filter((p, i) => i !== index)
    })
  }

  ////////////////////////////////////////////////////

  renderActionModal () {
    if (!this.state.actionModalOpen) return null
    return (
      <ProductActionModal
        editAction={this.state.editAction}
        onSave={this.onSaveAction.bind(this)}
        onClose={this.onCloseActionModal.bind(this)}
      />
    )
  }

  render () {
    const {handleSubmit, onClose} = this.props
    return (
      <ProductTypeModalView
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onSave={this.onSaveAction.bind(this)}
        onClose={onClose}
        addedAuctions={this.state.addedAuction}
        actions={this.state.actions}
        onClickAddAction={this.onClickAddAction.bind(this)}
        onClickEditAction={this.onClickEditAction.bind(this)}
        onClickDeleteAction={this.onClickDeleteAction.bind(this)}

        grokFields={this.state.grokFields}
        onClickAddGrokField={this.onClickAddGrokField.bind(this)}
        onClickEditGrokField={this.onClickEditGrokField.bind(this)}
        onClickDeleteGrokField={this.onClickDeleteGrokField.bind(this)}
      >
        {this.renderActionModal()}
      </ProductTypeModalView>
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: props.editType
  })
)(reduxForm({form: 'productTypeForm'})(ProductTypeModal))