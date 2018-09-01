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

  render () {
    const {handleSubmit} = this.props
    return (
      <ShapeEditModalView
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onClickClose={this.onHide.bind(this)}
      />
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: props.editShape
  })
)(reduxForm({form: 'shapeEditForm'})(ShapeEditModal))
