import React, {Component} from 'react'
import {getFormValues, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import SimpleModalContainer from 'containers/modal/SimpleModalContainer'

import ShapeEditModalView from './ShapeEditModalView'
import RefreshOverlay from 'components/common/RefreshOverlay'

class ShapeEditModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: (props.editShape ? props.editShape.fields : []) || [],
      applyDeviceIds: (props.editShape ? props.editShape.applyDeviceIds : []) || [],
      editField: null,
      fieldModalOpen: false,
    }
  }
  componentWillMount () {
    this.props.updateShapeScriptResult([])
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

  getServers () {
    const {devices} = this.props
    return devices.filter(p => !!p.monitors)
  }

  //////////////////////////////////////////////////////////////

  onClickTest () {
    const {allValues, applyDeviceIds} = this.props
    const {fields} = this.state
    if (!applyDeviceIds.length) return alert('Please choose applied devices first.')
    this.props.testShapeScript({
      deviceIds: applyDeviceIds.join(','),
      shape: {
        ...allValues,
        fields
      }
    })
  }

  //////////////////////////////////////////////////////////////

  renderFieldModal () {
    const {fieldModalOpen, editField} = this.state
    if (!fieldModalOpen) return null
    const content = [
      {name: 'Name', key: 'name'},
      {name: 'Test Value', key: 'value'}
    ]
    return (
      <SimpleModalContainer
        header="Field"
        content={content}
        initialValues={editField}
        doAction={this.onClickSaveField.bind(this)}
        onClose={this.closeFieldModal.bind(this)}
        buttonText="OK"
      />
    )
  }

  render () {
    const {handleSubmit, shapeScriptResult, shapeScriptStatus, servers} = this.props
    return (
      <ShapeEditModalView
        fields={this.state.fields}
        shapeScriptResult={shapeScriptResult}

        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onClickClose={this.onHide.bind(this)}

        onClickAddField={this.onClickAddField.bind(this)}
        onClickEditField={this.onClickEditField.bind(this)}
        onClickDeleteField={this.onClickDeleteField.bind(this)}

        onClickTest={this.onClickTest.bind(this)}

        servers={this.getServers()}
      >
        {this.renderFieldModal()}
        {shapeScriptStatus === 'loading' ? <RefreshOverlay/> : ''}
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
