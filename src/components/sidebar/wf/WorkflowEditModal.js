import React from 'react'
import {connect} from 'react-redux'
import {reduxForm, getFormValues} from 'redux-form'
import uuid from 'uuid'
import {assign, merge, keys, find} from 'lodash'

import WorkflowEditModalView from './WorkflowEditModalView'
import WorkflowEditModalView1 from './WorkflowEditModalView1'
import DiagramObjectModal from 'components/sidebar/wf/diagram/DiagramObjectModal'
import {drawFlows} from "components/sidebar/wf/DiagramLoader"
import {extendShape, productAction2Shape} from 'components/sidebar/wf/diagram/DiagramItems'
import {DiagramTypes} from 'shared/Global'
import BrainCellModal from 'components/sidebar/settings/braincell/BrainCellModal'
import RefreshOverlay from 'components/common/RefreshOverlay'
import GrokFieldModal from './GrokFieldModal'
import ShapeListModal from './ShapeListModal'

const typeOptions = [{
  label: 'Customer', value: 'normal'
}, {
  label: 'Builtin', value: 'system'
}]

const timeOptions = [{
  label: 'Minute', value: 'minute'
}, {
  label: 'Hour', value: 'hour'
}, {
  label: 'Day', value: 'day'
}]

const conditionOptions = [{
  label: 'IP', value: 'ip'
}, {
  label: 'User', value: 'user'
}]

const SCHEDULED = 'scheduled'

class WorkflowEditModal extends React.Component {
  constructor(props) {
    super(props)


    const shapes = []
    this.props.productTypes.forEach(p => {
      const actions = p.actions || []
      actions.forEach(action => {
        shapes.push(productAction2Shape(action, p))
      })
    })

    this.props.shapes.forEach(p => {
      shapes.push(extendShape(p))
    })

    const wfData = drawFlows((props.editWf || {}).flowItems || [], shapes)

    console.log(wfData)
    this.state = {
      permitterUsers: props.editWf ? (props.editWf.permitterUsers || []) : [],
      tab: 'general',
      shapeAnchorEl: null,
      shape: null,
      shapeModalOpen: false,
      wfData,

      tags: props.editWf ? (props.editWf.tags || []) : [],
      applyDeviceIds: props.editWf ? (props.editWf.applyDeviceIds || []) : [],

      rulePanelExpanded: false,
      brainCellType: 'Incident',

      editShape: null,
      keyField: null,

      editGrokField: null,
      grokFieldModalOpen: false,
      grokFieldMenuOpen: false,

      active: 1,

      loading: false,
      editValues: null,
      brainCellModalOpen: false,

      advancedModalOpen: false,

      shapListModal: false
    }
  }

  componentWillMount() {
    this.props.fetchDevices()
    this.props.fetchShapes()
    this.props.fetchOutputObjects()

    const {editWf} = this.props
    if (editWf && editWf.filterType === 'PRODUCT') {
      const {productId} = editWf
      if (productId) {
        const {productVendors, productTypes} = this.props
        const vendor = productVendors.filter(p => (p.productIds || []).includes(productId))[0]
        if (vendor) {
          this.props.change('productVendorId', vendor.id)
          const type = productTypes.filter(p => (p.vendorIds || []).includes(vendor.id))[0]
          if (type) {
            this.props.change('productTypeId', type.id)
          }
        }
      }
    }
  }

  componentDidUpdate(prevProps) {
    const {allValues} = this.props
    // if (prevProps.allValues && prevProps.allValues.type !== 'system' && this.props.allValues.type === 'system') {
    //   this.props.change('calledDirect', true)
    // }

    if (allValues) {
      if (allValues.openIncident && !allValues.incidentTemplateId &&
        (prevProps.allValues && !prevProps.allValues.openIncident)) {
        setTimeout(() => {
          this.setState({
            brainCellModalOpen: true,
            editBrainCell: null
          })
          // this.props.showBrainCellModal(true, null)
        }, 1)
      }
    }
  }

  getWfDataItems() {
    const {shapes, productTypes} = this.props
    const wfDataItems = this.state.wfData.objects.map(p => {
      const {productTypeId, actionId} = p.config
      const {uiprops, shapeId} = p.data
      const {type} = uiprops
      if (type === 'CUSTOMSHAPE') {
        const shape = find(shapes, {id: shapeId})
        return {
          shape,
          data: p
        }
      } else if (type === 'PRODUCTACTION') {
        const productType = find(productTypes, {id: productTypeId})
        const productAction = find(productType.actions, {id: actionId})
        const shape = productAction2Shape(productAction, productType)
        return {
          shape,
          data: p
        }
      } else {
        const shape = find(shapes, {type})
        return {
          shape,
          data: p
        }
      }
    })
    return wfDataItems
  }

  getWfDataItems2() {
    const {productTypes} = this.props
    const wfDataItems = this.state.wfData.objects.map(p => {
      const {sentence, name, variable, condition, fieldType, field, uiprops,
        grokFieldRules, visibleGrokFields} = p.data
      const type = p.config.type || uiprops.type

      let itemPreLabel = ''
      let itemLabel = ''
      let itemValue = ''

      let itemPreLabelKey = ''
      let itemLabelKey = ''
      let itemValueKey = 'sentence'

      const extraFields = []
      let grokFields = []

      switch (type) {
        case 'DECISION':
        case 'EXCLUDE': {
          itemLabel = 'Match Text'
          if (condition === 'greaterThan') itemLabel = 'Greater Than'
          if (type === 'EXCLUDE') itemLabel = `Not ${itemLabel}`
          var varname = (fieldType === 'field' ? field :
              fieldType === 'variable' ? variable : 'message') || ''
          const words = varname.split('.')
          const lastword = words[words.length - 1]
          itemPreLabel = lastword
          itemValue = `${sentence}`

          itemPreLabelKey = fieldType === 'message' ? '' : fieldType
          itemLabelKey = 'condition'
          break
        }
        case 'PRODUCTACTION': {
          itemPreLabel = 'Detected Action'
          itemLabel = 'Match Action'
          itemValue = `${sentence}`

          const productType = find(productTypes, {id: field})
          if (productType && productType.grokFields) {
            grokFields = productType.grokFields

            if (visibleGrokFields) {
              visibleGrokFields.forEach(visibleField => {
                const rule = (grokFieldRules || {})[visibleField]
                extraFields.push({
                  name: visibleField,
                  ...rule
                })
              })
            }
          }
          break
        }
        case 'IMQuery': {
          itemPreLabel = 'Detected Action'
          itemLabel = 'Match Action'
          itemValue = `${sentence}`

          if (visibleGrokFields) {
            if (visibleGrokFields.includes('User')) {
              const rule = (grokFieldRules || {})['User']
              extraFields.push({
                ...rule,
                name: 'User'
              })
            }

            if (visibleGrokFields.includes('Last Time')) {
              const rule = (grokFieldRules || {})['Last Time']
              extraFields.push({
                ...rule,
                name: 'Last Time',
                rule: ' > '
              })
            }
          }

          grokFields = ['User', 'Last Time']
          break
        }
        case 'COUNT':
          itemPreLabel = 'CountWFTriggered'
          itemLabel = ' > '
          itemValue = sentence

          itemValueKey = 'variable'
          break
        case 'CUSTOMSHAPE':
          itemLabel = p.title || p.name
          itemValue = sentence

          itemValueKey = 'sentence'
          break
        case 'TIMELAST':
          itemLabel = type
          itemValue = `${sentence}min`
          break
        case 'TIMEIN':
        default:
          itemLabel = type
          itemValue = sentence || name
      }

      return {
        prelabel: itemPreLabel,
        prelabelKey: itemPreLabelKey,
        label: itemLabel,
        labelKey: itemLabelKey,
        value: itemValue,
        valueKey: itemValueKey,
        extraFields,
        grokFields
      }
    })
    return wfDataItems
  }

  getMergedShapes() {
    const {productTypes, shapes} = this.props

    const typeShapes = []
    productTypes.forEach(p => {
      const actions = p.actions || []
      actions.forEach(action => {
        typeShapes.push(productAction2Shape(action, p))
      })
    })

    return [
      ...shapes,
      ...typeShapes
    ]
  }

  onSubmit(values) {
    if (!values) return
    const {onSave, userInfo} = this.props
    const {permitterUsers, wfData, tags, applyDeviceIds} = this.state

    const entity = {
      ...values,
      permitterUsers,
      flowItems: wfData.objects.map(p => p.data),
      tags,
      applyDeviceIds
    }
    if (!entity.ownerUser) entity.ownerUser = userInfo.username

    if (entity.filterType === 'PRODUCT_TYPE') {
      if (!entity.productTypeId) return alert('Please choose product type')
    } else {
      if (!entity.productId) return alert('Please choose product')
    }

    const tagIndex = entity.tags.indexOf(SCHEDULED)
    if (entity.scheduled) {
      if (tagIndex < 0) entity.tags.push(SCHEDULED)
    } else {
      if (tagIndex >= 0) entity.tags.splice(tagIndex, 1)
    }

    if (entity.id && entity.uuid) {
      entity.type = 'normal'
    }

    onSave && onSave(entity)
    this.onClickClose()
  }

  onClickClose() {
    const {onClose} = this.props
    onClose && onClose()
  }

  onClickAddUser() {
    this.props.showUserPickModal(true)
  }

  onClickRemoveUser(user) {
    const {permitterUsers} = this.state
    this.setState({
      permitterUsers: permitterUsers.filter(p => p !== user)
    })
  }

  onCloseAddUser(user) {
    this.props.showUserPickModal(false)
    const {permitterUsers} = this.state
    if (user) {
      this.setState({
        permitterUsers: [...permitterUsers, user]
      })
    }
  }

  ////////////////////////////////////////////////////

  onChangeTab(e, value) {
    this.setState({
      tab: value
    })
  }

  ////////////////////////////////////////////////////


  onClickAddShape(e) {
    this.setState({
      shapeAnchorEl: e.target
    })
  }

  onCloseShapeMenu() {
    this.setState({
      shapeAnchorEl: null
    })
  }

  onClickShape(shape, e) {
    this.onCloseShapeMenu()

    this.setState({
      shapeModalOpen: false,
      // shapeAnchorEl: e.target
    }, () => {
      if (shape.type === 'PRODUCTACTION') {
        this.onSaveShape('', shape.initialValues, this.buildObjectConfig(shape))
      } else {
        this.setState({
          shapeModalOpen: true,
          rulePanelExpanded: true,
          editShape: null,
          keyField: null,
          shape
        })
      }
    })
  }


  onCloseShapeModal() {
    this.setState({
      shapeModalOpen: false
    })
  }

  onSaveShape(stateId, values, objectConfig) {
    const {wfData} = this.state
    const {objects} = wfData
    const object = {...objectConfig}

    console.log(values)

    object.data = merge({}, values, {
      uiprops: {
        type: (objectConfig.config || {}).type,
        x: objectConfig.x,
        y: objectConfig.y,
        w: objectConfig.w,
        h: objectConfig.h,
        fill: objectConfig.fill,
        lines: []
      }
    })
    object.name = values.name || object.name

    if (object.data.uuid) {
      this.setState({
        wfData: {
          ...wfData,
          objects: objects.map(p => p.data.uuid === object.data.uuid ? object : p)
        }
      })
    } else {
      object.data = assign(object.data, {
        uuid: uuid.v4(),
        step: Math.max.apply(null, [0, ...objects.map(u => u.data ? u.data.step : 0)]) + 1
      })
      let x = 100
      let y = 100

      if (objects.length) {
        const lastObj = objects[objects.length - 1]
        x = lastObj.data.uiprops.x + lastObj.data.uiprops.w + 50
        y = lastObj.data.uiprops.y
        lastObj.data.uiprops.lines.push({
          targetUuid: object.data.uuid,
          startPoint: 0,
          endPoint: 0
        })
      }

      object.data.uiprops.x = x
      object.data.uiprops.y = y

      this.setState({
        wfData: {
          ...wfData,
          objects: [...objects, object]
        }
      })
    }

    console.log(object)

    return true
  }

  onClickDeleteShape(index) {
    const {wfData} = this.state
    const {objects} = wfData

    if (!window.confirm('Click OK to remove rule')) return

    const current = objects[index]

    if (index < objects.length - 1) {
      const next = objects[index + 1]

      objects.forEach((object, i) => {
        if (i === index) return
        object.data.uiprops.lines.forEach(line => {
          if (line.targetUuid === current.data.uuid) {
            line.targetUuid = next.data.uuid
          }
        })
      })
    } else {
      objects.forEach((object, i) => {
        if (i === index) return
        const {uiprops} = object.data
        uiprops.lines = uiprops.lines.filter(line => line.targetUuid !== current.data.uuid)
      })
    }

    objects.splice(index, 1)
    this.setState({
      wfData: {
        ...wfData,
        objects
      }
    })
    return false
  }

  onClickEditShape(index, keyField, e) {
    const {wfData} = this.state
    const {objects} = wfData
    const current = objects[index]

    console.log(current)

    if (current.config.type === 'PRODUCTACTION') return

    const filter = {}
    if (current.data.shapeId) {
      filter.id = current.data.shapeId
    } else {
      filter.type = current.config.type
    }
    const shape = find(this.props.shapes, filter)


    if (!shape) return //alert('Shape not found')

    this.setState({
      shapeModalOpen: false,
      shapeAnchorEl: e.target
    }, () => {
      this.setState({
        shapeModalOpen: true,
        rulePanelExpanded: true,
        editShape: current,
        // keyField,
        shape
      })
    })
    this.props.resetForm('simpleModalForm')
  }

  ////////////////////////////////////////////////////

  onClickAddExtra (shapeIndex, editGrokFields, e) {
    // const {productTypes} = this.props
    const {wfData} = this.state
    const {objects} = wfData
    const editShape = objects[shapeIndex]
    console.log(editShape)
    // const productType = find(productTypes, {id: editShape.data.field})

    e.stopPropagation()

    // const editGrokFields = productType.grokFields || []

    this.setState({
      grokFieldMenuOpen: true,
      editShape,
      shapeAnchorEl: e.target,
      editGrokFields
    })
  }

  onCloseGrokFieldMenu () {
    this.setState({
      grokFieldMenuOpen: false
    })
  }

  onClickEditShapeExtra (shapeIndex, name, keyField, e) {
    // const {productTypes} = this.props
    const {wfData} = this.state
    const {objects} = wfData
    const editShape = objects[shapeIndex]

    console.log(editShape)

    // const productType = find(productTypes, {id: editShape.data.field})

    const grokFieldRules = editShape.data.grokFieldRules || {}
    const editGrokField = {
      name,
      ...grokFieldRules[name]
    }

    this.setState({
      editGrokFieldKey: keyField,
      editGrokField,
      editShape,
      grokFieldModalOpen: true,
      shapeAnchorEl: e.target
    })
  }

  onClickDeleteShapeExtra (shapeIndex, name) {
    const {wfData} = this.state
    const {objects} = wfData
    const editShape = objects[shapeIndex]
    const object = {...editShape}

    if (!window.confirm('Click OK to remove')) return

    object.data.visibleGrokFields = object.data.visibleGrokFields || []
    const index = object.data.visibleGrokFields.indexOf(name)
    if (index >= 0) {
      object.data.visibleGrokFields.splice(index, 1)
    }

    this.setState({
      wfData: {
        ...wfData,
        objects: objects.map(p => p.data.uuid === object.data.uuid ? object : p)
      }
    })
  }

  onCloseGrokFieldModal () {
    this.setState({
      grokFieldModalOpen: false
    })
  }

  onSaveGrokField (values) {
    const {editShape, editGrokField, wfData} = this.state
    const {objects} = wfData
    const object = {...editShape}


    if (object.data.uuid) {
      const grokFieldRules = object.data.grokFieldRules || {}
      grokFieldRules[editGrokField.name] = {
        ...grokFieldRules[editGrokField.name],
        ...values
      }
      object.data.grokFieldRules = grokFieldRules

      this.setState({
        wfData: {
          ...wfData,
          objects: objects.map(p => p.data.uuid === object.data.uuid ? object : p)
        }
      })
    }
  }

  onClickShowGrokField (visibleField) {
    const {editShape, wfData} = this.state
    const {objects} = wfData
    const object = {...editShape}

    object.data.visibleGrokFields = object.data.visibleGrokFields || []
    const index = object.data.visibleGrokFields.indexOf(visibleField)
    if (index < 0) {
      object.data.visibleGrokFields.push(visibleField)
      object.data.grokFieldRules = object.data.grokFieldRules || {}
      object.data.grokFieldRules[visibleField] = {
        rule: 'match',
        value: ''
      }
    } else {
      object.data.visibleGrokFields.splice(index, 1)
    }

    this.setState({
      wfData: {
        ...wfData,
        objects: objects.map(p => p.data.uuid === object.data.uuid ? object : p)
      }
    })
  }

  ////////////////////////////////////////////////////

  onExpandRulePanel(e, expanded) {
    this.setState({
      rulePanelExpanded: expanded
    })
  }

  ////////////////////////////////////////////////////

  onCheckAppliedDevice(e) {
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
    console.log(e.target)
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

  ////////////////////////////////////////////////////

  onClickEditIncident () {
    const {allValues, brainCells} = this.props
    const {incidentTemplateId} = allValues || {}
    if (!incidentTemplateId) return null
    const entity = brainCells.filter(p => p.id === incidentTemplateId)[0]
    if (!entity) return
    // this.props.showBrainCellModal(true, entity)
    this.setState({
      brainCellModalOpen: true,
      editBrainCell: entity
    })
  }

  getTags () {
    const {brainCells} = this.props
    return brainCells.filter(p => p.type === 'Tag')
  }

  onSaveBraincell (entity) {
    if (entity.id) {
      this.props.updateBrainCell(entity)
    } else {
      this.setState({
        loading: true
      })
      this.props.addBrainCell(entity, (incidentTpl) => {
        this.setState({
          loading: false
        })

        // const {editValues} = this.state
        // editValues.incidentTemplateId = incidentTpl.id
        this.props.change('incidentTemplateId', incidentTpl.id)

        // this.props.onSave(editValues)
        // this.onClickClose()
      })
    }
  }

  onCloseBraincellModal () {
    // this.props.showBrainCellModal(false)
    this.setState({
      brainCellModalOpen: false
    })
  }

  ////////////////////////////////////////////////////

  onClickAdvanced () {
    this.setState({
      advancedModalOpen: true
    })
  }

  onCloseAdvanced () {
    this.setState({
      advancedModalOpen: false
    })
  }

  ////////////////////////////////////////////////////

  getMainMenuItems () {
    return [{

    }]
  }

  ////////////////////////////////////////////////////

  buildObjectConfig (shape) {
    const tpl = extendShape(shape)
    const w = tpl.w || 120
    const h = tpl.h || 50
    const objectConfig = {
      // imgIndex: item.imgIndex,

      x: 0,
      y: 0,
      w,
      h,

      type: DiagramTypes.OBJECT,
      config: {
        ...tpl.config
      },
      fill: tpl.fill,
      data: assign({}, tpl.data)
    }

    return objectConfig
  }

  ////////////////////////////////////////////////////

  getResetVisible () {
    const {editWf} = this.props
    return editWf && !!editWf.id && !!editWf.uuid
  }

  onClickReset () {
    const {editWf} = this.props
    if (!window.confirm('Click OK to reset')) return
    this.props.resetCustomerFlow(editWf)
    this.onClickClose()
  }

  ////////////////////////////////////////////////////

  onClickAddNewShape () {
    this.setState({
      shapListModal: true
    })
  }

  onSaveNewShape () {

  }

  onCloseNewShape () {
    this.setState({
      shapListModal: false
    })
  }

  ////////////////////////////////////////////////////

  renderGrokFieldModal () {
    if (!this.state.grokFieldModalOpen) return null
    const {editGrokField, editGrokFieldKey} = this.state
    return (
      <GrokFieldModal
        keyField={editGrokFieldKey}
        editGrokField={editGrokField}
        onSave={this.onSaveGrokField.bind(this)}
        onClose={this.onCloseGrokFieldModal.bind(this)}
      />
    )
  }

  renderUserPickModal() {
    if (!this.props.userPickModalOpen) return null
  }

  renderBraincellModal () {
    if (!this.state.brainCellModalOpen) return null
    return (
      <BrainCellModal
        type={this.state.brainCellType}
        allTags={this.getTags()}
        onSave={this.onSaveBraincell.bind(this)}
        onClose={this.onCloseBraincellModal.bind(this)}

        brainCells={this.props.brainCells}
        editBrainCell={this.state.editBrainCell}

        showScriptModal={this.props.showScriptModal}
        showGrokModal={this.props.showGrokModal}
        showCellParamModal={this.props.showCellParamModal}
        scriptModalOpen={this.props.scriptModalOpen}
        grokModalOpen={this.props.grokModalOpen}
        editCellParam={this.props.editCellParam}
        cellParamModalOpen={this.props.cellParamModalOpen}
      />
    )
  }

  renderShapeListModal (shapes) {
    if (!this.state.shapListModal) return null
    const {addShape, updateShape, removeShape, testShapeScript,
      shapeScriptResult, updateShapeScriptResult, shapeScriptStatus,
      devices, playbookObjects} = this.props
    return (
      <ShapeListModal
        shapes={shapes}
        onSave={this.onSaveNewShape.bind(this)}
        onClose={this.onCloseNewShape.bind(this)}
        onClickShape={this.onClickShape.bind(this)}

        addShape={addShape}
        updateShape={updateShape}
        removeShape={removeShape}
        testShapeScript={testShapeScript}
        applyDeviceIds={this.state.applyDeviceIds}

        shapeScriptResult={shapeScriptResult}
        updateShapeScriptResult={updateShapeScriptResult}
        shapeScriptStatus={shapeScriptStatus}

        devices={devices}
        playbookObjects={playbookObjects}
      />
    )
  }

  renderLoader () {
    if (!this.state.loading) return null
    return (
      <RefreshOverlay/>
    )
  }

  renderShapeModal() {
    if (!this.state.shapeModalOpen) return null

    const {shape, editShape, wfData, keyField} = this.state
    const {objects} = wfData


    const tpl = extendShape(shape)
    const objectConfig = editShape || this.buildObjectConfig(shape)

    const contents = tpl.form || []
    if (shape.type === 'CUSTOMSHAPE') {
      (shape.inputFields || []).forEach(field => {
        contents.push({
          key: `mapping.${field}`,
          name: field
        })
      })
    }
    const initialValues = editShape ? {
      ...editShape.data
    } : (shape.initialValues || {})
    if (!editShape) {
      contents.forEach(p => {
        if (!p.default) return

        if (p.form) {
          keys(p.default).forEach(k => {
            initialValues[k] = p.default[k]
          })
        } else {
          initialValues[p.key] = p.default
        }
      })
      initialValues.title = shape.title
    }
    initialValues.shapeId = shape.id

    return (
      <DiagramObjectModal
        stateId=""
        flow={{}}
        objects={objects}
        closeModal={this.onCloseShapeModal.bind(this)}
        objectConfig={objectConfig}

        header={`Edit ${tpl.title}`}

        contents={contents}
        initialValues={initialValues}
        onSaveDiagramObject={this.onSaveShape.bind(this)}

        commands={[]}
        keyFieldMode={keyField}
      />
    )
  }

  render() {
    const {handleSubmit, groups, newView} = this.props
    const ModalView = newView ? WorkflowEditModalView1 : WorkflowEditModalView
    const shapes = this.getMergedShapes()
    return (
      <ModalView
        {...this.props}
        groupOptions={groups.map(p => ({label: p.name, value: p.id}))}
        typeOptions={typeOptions}
        conditionOptions={conditionOptions}
        timeOptions={timeOptions}
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        onClickClose={this.onClickClose.bind(this)}

        advancedModalOpen={this.state.advancedModalOpen}
        onClickAdvanced={this.onClickAdvanced.bind(this)}
        onCloseAdvanced={this.onCloseAdvanced.bind(this)}

        tab={this.state.tab}
        onChangeTab={this.onChangeTab.bind(this)}

        permitterUsers={this.state.permitterUsers}
        onClickAddUser={this.onClickAddUser.bind(this)}
        onClickRemoveUser={this.onClickRemoveUser.bind(this)}

        editShape={this.state.editShape}
        shapeAnchorEl={this.state.shapeAnchorEl}
        shapes={shapes}
        wfDataItems={this.getWfDataItems()}
        onClickAddShape={this.onClickAddShape.bind(this)}
        onCloseShapeMenu={this.onCloseShapeMenu.bind(this)}
        onClickShape={this.onClickShape.bind(this)}
        onClickDeleteShape={this.onClickDeleteShape.bind(this)}
        onClickEditShape={this.onClickEditShape.bind(this)}

        onClickAddNewShape={this.onClickAddNewShape.bind(this)}

        onClickAddExtra={this.onClickAddExtra.bind(this)}
        onClickEditShapeExtra={this.onClickEditShapeExtra.bind(this)}
        onClickDeleteShapeExtra={this.onClickDeleteShapeExtra.bind(this)}
        grokFieldModal={this.renderGrokFieldModal()}
        onCloseGrokFieldModal={this.onCloseGrokFieldModal.bind(this)}

        editGrokFields={this.state.editGrokFields}
        grokFieldMenuOpen={this.state.grokFieldMenuOpen}
        onCloseGrokFieldMenu={this.onCloseGrokFieldMenu.bind(this)}
        onClickShowGrokField={this.onClickShowGrokField.bind(this)}

        active={this.state.active}
        onClickSidebarGroup={i => this.setState({active: i})}
        shapeModal={this.renderShapeModal()}
        onCloseShapeModal={this.onCloseShapeModal.bind(this)}
        rulePanelExpanded={this.state.rulePanelExpanded}
        onExpandRulePanel={this.onExpandRulePanel.bind(this)}
        onClickEditIncident={this.onClickEditIncident.bind(this)}

        applyDeviceIds={this.state.applyDeviceIds}
        onCheckAppliedDevice={this.onCheckAppliedDevice.bind(this)}
        onChangeApplyAllDevices={this.onChangeApplyAllDevices.bind(this)}

        resetVisible={this.getResetVisible()}
        onClickReset={this.onClickReset.bind(this)}

        mainMenuItems={this.getMainMenuItems()}
      >
        {this.renderUserPickModal()}
        {this.renderBraincellModal()}
        {this.renderShapeListModal(shapes)}
        {this.renderLoader()}
      </ModalView>
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: {
      type: 'normal',
      filterType: 'PRODUCT_TYPE',
      ...props.editWf
    },
    allValues: getFormValues('wfNameForm')(state)
  })
)(reduxForm({form: 'wfNameForm'})(WorkflowEditModal))
