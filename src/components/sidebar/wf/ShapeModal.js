import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'

import ShapeModalView from './ShapeModalView'

class ShapeModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  handleFormSubmit (props) {
    const entity = {
      ...props
    }
    this.props.onSave(entity)
    this.props.onClose()
  }
  render () {
    const {handleSubmit, editGrokField, keyField} = this.props
    return (
      <ShapeModalView
        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
      />
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: props.editShape
  }), {})(reduxForm({
  form: 'shapeModalEditForm'
})(ShapeModal))
