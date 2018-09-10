import React, {Component} from 'react'
import {getFormValues, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import SimpleModalContainer from 'containers/modal/SimpleModalContainer'

import ShapeEditModalView from './ShapeEditModalView'
import RefreshOverlay from 'components/common/RefreshOverlay'
import {showPrompt, showConfirm} from 'components/common/Alert'
import {find} from "lodash";

class ShapeEditModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {},
      applyDeviceIds: props.applyDeviceIds || [],

      editField: null,
      fieldModalOpen: false,
      inputFields: (props.editShape ? props.editShape.inputFields : []) || [],
      outputFields: (props.editShape ? props.editShape.outputFields : []) || []
    }
  }
  componentWillMount () {
    this.props.updateShapeScriptResult([])
  }
  handleFormSubmit (values) {
    const {editShape} = this.props
    const {outputFields, inputFields} = this.state
    const entity = {
      ...editShape,
      ...values,
      inputFields,
      outputFields
    }

    if (!entity.title) return alert('Please input name')

    this.props.onSave(entity)
  }

  onHide () {
    this.props.onClose()
  }

  onClickEditField (index, name) {
    const {fields} = this.state

    showPrompt('Please type testing value', value => {
      if (!value) return

      this.setState({
        fields: {
          ...fields,
          [name]: value
        }
      })
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

  onCheckInputField (field, checked) {
    const {inputFields} = this.state
    if (checked) {
      this.setState({
        inputFields: [...inputFields, field]
      })
    } else {
      this.setState({
        inputFields: inputFields.filter(p => p !== field)
      })
    }
  }

  onCheckOutputField (field, checked) {
    const {outputFields} = this.state
    if (checked) {
      this.setState({
        outputFields: [...outputFields, field]
      })
    } else {
      this.setState({
        outputFields: outputFields.filter(p => p !== field)
      })
    }
  }

  //////////////////////////////////////////////////////////////

  getInputObj () {
    const {
      playbookObjects, allValues
    } = this.props
    const {inputName} = allValues || {}
    const inputObj = find(playbookObjects, {name: inputName}) || {}
    return inputObj
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
      playbookObjects, allValues
    } = this.props
    return (
      <ShapeEditModalView
        allValues={allValues}
        fields={this.state.fields}
        shapeScriptResult={shapeScriptResult}

        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        onClickClose={this.onHide.bind(this)}

        onClickEditField={this.onClickEditField.bind(this)}

        onClickTest={this.onClickTest.bind(this)}

        servers={this.getServers()}

        playbookObjects={playbookObjects}

        onClickAddVar={this.onClickAddVar.bind(this)}
        onClickDeleteVar={this.onClickDeleteVar.bind(this)}

        applyDeviceIds={this.state.applyDeviceIds}
        onCheckAppliedDevice={this.onCheckAppliedDevice.bind(this)}
        onChangeApplyAllDevices={this.onChangeApplyAllDevices.bind(this)}

        inputObj={this.getInputObj()}
        inputFields={this.state.inputFields}
        outputFields={this.state.outputFields}
        onCheckOutputField={this.onCheckOutputField.bind(this)}
        onCheckInputField={this.onCheckInputField.bind(this)}
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
      inputName: (props.playbookObjects[0] || {}).name,
      outputName: (props.playbookObjects[0] || {}).name,
    },
    allValues: getFormValues('shapeEditForm')(state)
  })
)(reduxForm({form: 'shapeEditForm'})(ShapeEditModal))
