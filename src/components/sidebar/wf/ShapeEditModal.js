import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import {connect} from 'react-redux'

import ShapeEditModalView from './ShapeEditModalView'

class ShapeEditModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: []
    }
  }
  handleFormSubmit (values) {
    const {editShape} = this.props
    const entity = {
      ...editShape,
      ...values
    }

    if (!entity.name) return alert('Please input name')

    this.props.onSave(entity)
  }

  onHide () {
    this.props.onClose()
  }

  onClickAddField () {
    const name = window.prompt('Please type name')
    if (!name) return
    const {fields} = this.state
    this.setState({
      fields: [...fields, name]
    })
  }

  onClickEditField (index) {
    const {fields} = this.state
    const name = window.prompt('Please type name', fields[index])
    if (!name) return
    this.setState({
      fields: fields.map((p, i) => i === index ? name : p)
    })
  }

  onClickDeleteField (index) {
    if (!window.confirm('Click OK to remove')) return
    const {fields} = this.state
    this.setState({
      fields: fields.filter((p, i) => i !== index)
    })
  }

  //////////////////////////////////////////////////////////////

  onClickTest () {

  }

  //////////////////////////////////////////////////////////////

  render () {
    const {handleSubmit} = this.props
    return (
      <ShapeEditModalView
        fields={this.state.fields}

        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onClickClose={this.onHide.bind(this)}

        onClickAddField={this.onClickAddField.bind(this)}
        onClickEditField={this.onClickEditField.bind(this)}
        onClickDeleteField={this.onClickDeleteField.bind(this)}

        onClickTest={this.onClickTest.bind(this)}
      />
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: props.editShape || {
      baseName: '',
      type: 'CUSTOMSHAPE',
      img: 'param.png'
    }
  })
)(reduxForm({form: 'shapeEditForm'})(ShapeEditModal))
