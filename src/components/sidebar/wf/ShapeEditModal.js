import React, {Component} from 'react'
import {getFormValues, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import SimpleModalContainer from 'containers/modal/SimpleModalContainer'

import ShapeEditModalView from './ShapeEditModalView'

class ShapeEditModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: (props.editShape ? props.editShape.fields : []) || [],
      editField: null,
      fieldModalOpen: false
    }
  }
  handleFormSubmit (values) {
    const {editShape} = this.props
    const {fields} = this.state
    const entity = {
      ...editShape,
      ...values,
      fields
    }

    if (!entity.title) return alert('Please input name')

    this.props.onSave(entity)
  }

  onHide () {
    this.props.onClose()
  }

  onClickAddField () {
    this.setState({
      fieldModalOpen: true,
      editField: null
    })
  }

  onClickEditField (index) {
    const {fields} = this.state
    this.setState({
      editField: fields[index],
      fieldModalOpen: true
    })
  }

  onClickDeleteField (index) {
    if (!window.confirm('Click OK to remove')) return
    const {fields} = this.state
    this.setState({
      fields: fields.filter((p, i) => i !== index)
    })
  }

  onClickSaveField (values) {
    const {editField, fields} = this.state
    if (editField) {
      const index = fields.indexOf(editField)
      this.setState({
        fields: fields.map((p, i) => i === index ? values : p)
      })
    } else {
      this.setState({
        fields: [...fields, values]
      })
    }
  }

  closeFieldModal () {
    this.setState({
      fieldModalOpen: false
    })
  }

  //////////////////////////////////////////////////////////////

  onClickTest () {
    const {allValues} = this.props
    const {fields} = this.state
    this.props.testShapeScript({
      deviceIds: this.props.applyDeviceIds.join(','),
      shape: {
        ...allValues,
        fields
      }
    })
  }

  //////////////////////////////////////////////////////////////

  renderFieldModal () {
    const {fieldModalOpen} = this.state
    if (!fieldModalOpen) return null
    const content = [
      {name: 'Name', key: 'name'},
      {name: 'Test Value', key: 'value'}
    ]
    return (
      <SimpleModalContainer
        header="Field"
        content={content}
        doAction={this.onClickSaveField.bind(this)}
        onClose={this.closeFieldModal.bind(this)}
        buttonText="OK"
      />
    )
  }

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
      >
        {this.renderFieldModal()}
      </ShapeEditModalView>
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: props.editShape || {
      baseName: '',
      type: 'CUSTOMSHAPE',
      img: 'param.png',
      group: props.group
    },
    allValues: getFormValues('shapeEditForm')(state)
  })
)(reduxForm({form: 'shapeEditForm'})(ShapeEditModal))
