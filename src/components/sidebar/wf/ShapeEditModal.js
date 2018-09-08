import React, {Component} from 'react'
import {getFormValues, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import SimpleModalContainer from 'containers/modal/SimpleModalContainer'

import ShapeEditModalView from './ShapeEditModalView'
import RefreshOverlay from 'components/common/RefreshOverlay'
import {showPrompt, showConfirm} from 'components/common/Alert'

class ShapeEditModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: (props.editShape ? props.editShape.fields : []) || [],
      applyDeviceIds: props.applyDeviceIds || [],

      inputVars: (props.editShape ? props.editShape.inputVars : []) || [],
      outputVars: (props.editShape ? props.editShape.outputVars : []) || [],
      editField: null,
      fieldModalOpen: false,
    }
  }
  componentWillMount () {
    this.props.updateShapeScriptResult([])
  }
  handleFormSubmit (values) {
    const {editShape} = this.props
    const {fields, outputVars} = this.state
    const entity = {
      ...editShape,
      ...values,
      fields,
      outputVars
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
    const {allValues} = this.props
    const {fields, applyDeviceIds} = this.state
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

  onClickAddVar () {
    const {outputVars} = this.state
    showPrompt('Please type variable name', '', name => {
      if (!name) return
      this.setState({
        outputVars: [...outputVars, name]
      })
    })
  }

  onClickDeleteVar (index) {
    const {outputVars} = this.state
    showConfirm('Click OK to remove', btn => {
      if (btn !== 'ok') return
      this.setState({
        outputVars: outputVars.filter((p, i) => i !== index)
      })
    })
  }

  //////////////////////////////////////////////////////////////

  onCheckAppliedDevice (e) {
    let {applyDeviceIds} = this.state
    const {devices} = this.props
    const {applyAllDevices} = this.props.allValues || {}

    const id = e.target.value
    if (e.target.checked) {
      applyDeviceIds = [...applyDeviceIds, id]
      if (applyDeviceIds.length === devices.filter(p => !!p.monitors).length) {
        this.props.change('applyAllDevices', true)
      }
    } else {
      applyDeviceIds = applyDeviceIds.filter(p => p !== id)
      if (applyAllDevices) {
        this.props.change('applyAllDevices', false)
      }
    }

    this.setState({
      applyDeviceIds
    })
  }

  onChangeApplyAllDevices (e) {
    const {devices} = this.props
    if (e.target.checked) {
      this.setState({
        applyDeviceIds: devices.filter(p => !!p.monitors).map(p => p.id)
      })
    } else {
      this.setState({
        applyDeviceIds: []
      })
    }
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
    const {
      handleSubmit, shapeScriptResult, shapeScriptStatus, servers,
      outputObjects, allValues
    } = this.props
    return (
      <ShapeEditModalView
        allValues={allValues}
        fields={this.state.fields}
        shapeScriptResult={shapeScriptResult}

        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onClickClose={this.onHide.bind(this)}

        onClickAddField={this.onClickAddField.bind(this)}
        onClickEditField={this.onClickEditField.bind(this)}
        onClickDeleteField={this.onClickDeleteField.bind(this)}

        onClickTest={this.onClickTest.bind(this)}

        servers={this.getServers()}

        outputObjects={outputObjects}
        inputVars={this.state.inputVars}
        outputVars={this.state.outputVars}
        onClickAddVar={this.onClickAddVar.bind(this)}
        onClickDeleteVar={this.onClickDeleteVar.bind(this)}

        applyDeviceIds={this.state.applyDeviceIds}
        onCheckAppliedDevice={this.onCheckAppliedDevice.bind(this)}
        onChangeApplyAllDevices={this.onChangeApplyAllDevices.bind(this)}
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
      group: props.group,
      inputName: (props.outputObjects[0] || {}).name,
      outputName: (props.outputObjects[0] || {}).name,
    },
    allValues: getFormValues('shapeEditForm')(state)
  })
)(reduxForm({form: 'shapeEditForm'})(ShapeEditModal))
