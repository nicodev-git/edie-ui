import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'

import ShapeEditModalView from './ShapeEditModalView'

class ShapeEditModal extends Component {
  handleFormSubmit (values) {
    const {editShape} = this.props
    const entity = {
      ...editShape,
      ...values
    }
    this.props.onSave(entity)
  }

  onHide () {
    this.props.onClose()
  }

  onClickAddField () {
    const name = window.prompt('Please type name')
    if (!name) return

  }

  render () {
    const {handleSubmit} = this.props
    return (
      <ShapeEditModalView
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onClickClose={this.onHide.bind(this)}

        onClickAddField={this.onClickAddField.bind(this)}
      />
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: props.editShape
  })
)(reduxForm({form: 'shapeEditForm'})(ShapeEditModal))
