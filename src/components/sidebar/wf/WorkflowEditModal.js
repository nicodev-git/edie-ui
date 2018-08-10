import React from 'react'
import {connect} from 'react-redux'
import {reduxForm, getFormValues} from 'redux-form'
import uuid from 'uuid'
import {assign, merge, findIndex, keys} from 'lodash'

import WorkflowEditModalView from './WorkflowEditModalView'
import WorkflowEditModalView1 from './WorkflowEditModalView1'
import DiagramObjectModal from 'components/sidebar/wf/diagram/DiagramObjectModal'
import {drawFlows} from "components/sidebar/wf/DiagramLoader"
import {extendShape} from 'components/sidebar/wf/diagram/DiagramItems'
import {DiagramTypes} from 'shared/Global'
import BrainCellModal from 'components/sidebar/settings/braincell/BrainCellModal'
import RefreshOverlay from 'components/common/RefreshOverlay'
import BraincellTagPickerModal from 'components/sidebar/settings/braincell/BraincellTagPickerModal'

const typeOptions = [{
  label: 'Normal', value: 'normal'
}, {
  label: 'System', value: 'system'
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

    const wfData = drawFlows((props.editWf || {}).flowItems || [], this.props.shapes.map(p => extendShape(p)))

    this.state = {
      permitterUsers: props.editWf ? (props.editWf.permitterUsers || []) : [],
      tab: 'general',
      shapeAnchorEl: null,
      shape: null,
      shapeModalOpen: false,
      wfData,

      tagPickModalOpen: false,
      tags: props.editWf ? (props.editWf.tags || []) : [],
      tagInputValue: '',
      applyDeviceIds: props.editWf ? (props.editWf.applyDeviceIds || []) : [],

      rulePanelExpanded: false,
      brainCellType: 'Incident',

      editShape: null,
      keyField: null,

      active: 1,

      loading: false,
      editValues: null,

      advancedModalOpen: false
    }
  }

  componentWillMount() {
    this.props.fetchDevices()
    this.props.fetchShapes()
  }

  componentDidUpdate(prevProps) {
    const {allValues} = this.props
    if (prevProps.allValues && prevProps.allValues.type !== 'system' && this.props.allValues.type === 'system') {
      this.props.change('calledDirect', true)
    }

    if (allValues && allValues.openIncident && !allValues.incidentTemplateId &&
      (prevProps.allValues && !prevProps.allValues.openIncident)) {
      // console.log('show modal now')
      setTimeout(() => {
        this.props.showBrainCellModal(true, null)
      }, 1)
    }
  }

  getWfDataItems() {
    const wfDataItems = this.state.wfData.objects.map(p => {
      const {type} = p.config
      const {sentence, name, variable, condition, fieldType, field} = p.data

      let itemPreLabel = ''
      let itemLabel = ''
      let itemValue = ''

      let itemPreLabelKey = ''
      let itemLabelKey = ''
      let itemValueKey = 'sentence'

      switch (type) {
        case 'DECISION':
        case 'EXCLUDE': {
          itemLabel = 'Match Text'
          if (condition === 'greaterThan') itemLabel = 'Greater Than'
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
        case 'COUNT':
          itemLabel = type
          itemValue = `${variable} > ${sentence}`

          itemLabelKey = 'variable'
          break
        case 'TIMELAST':
          itemLabel = type
          itemValue = `${sentence}min`
          break
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
        valueKey: itemValueKey
      }
    })
    return wfDataItems
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

    const tagIndex = entity.tags.indexOf(SCHEDULED)
    if (entity.scheduled) {
      if (tagIndex < 0) entity.tags.push(SCHEDULED)
    } else {
      if (tagIndex >= 0) entity.tags.splice(tagIndex, 1)
    }

    // if (entity.openIncident && !entity.incidentTemplateId) {
    //   this.setState({
    //     editValues: entity
    //   })
    //   this.props.showBrainCellModal(true, null)
    //   return
    // }

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
      shapeAnchorEl: e.target
    }, () => {
      this.setState({
        shapeModalOpen: true,
        rulePanelExpanded: true,
        editShape: null,
        keyField: null,
        shape
      })
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
      // this.props.updateFlowItem('', flow, object)
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
      // this.props.addFlowItem('', flow, object)

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

    if (!keyField) return
    const shapeIndex = findIndex(this.props.shapes, {
      type: current.config.type
    })

    if (shapeIndex < 0) return alert('Shape not found')

    this.setState({
      shapeModalOpen: false,
      shapeAnchorEl: e.target
    }, () => {
      this.setState({
        shapeModalOpen: true,
        rulePanelExpanded: true,
        editShape: current,
        keyField,
        shape: this.props.shapes[shapeIndex]
      })
    })
    this.props.resetForm('simpleModalForm')
  }

  ////////////////////////////////////////////////////
  onChangeTagInput(event, {newValue}) {
    this.setState({
      tagInputValue: newValue
    })
  }

  onClickAddTag() {
    const {tags} = this.state
    const {allTags, allValues} = this.props
    const {tag} = allValues
    if (!tag) return

    this.setState({
      tags: [...tags, tag],
      tagInputValue: ''
    })

    this.props.change('tag', '')

    if (allTags.filter(p => p.name.toLowerCase() === tag.toLowerCase()).length) return

    this.props.addBrainCell({
      type: 'Tag',
      name: tag,
      description: '',
    })
  }

  onClickDeleteTag(index) {
    const {tags} = this.state
    tags.splice(index, 1)
    this.setState({tags})
  }

  onClickExistingTag(tag) {
    if (!tag) return null
    const {tags} = this.state

    this.setState({
      tags: [...tags, tag]
    })
  }

  onClickTagPick () {
    this.setState({
      tagPickModalOpen: true
    })
  }

  onPickTag (tag) {
    const {tags} = this.state
    if (tags.indexOf(tag) >= 0) return alert('Already exists')
    this.setState({
      tags: [...tags, tag]
    })
    this.onClosePickTag()
  }

  onClosePickTag () {
    this.setState({tagPickModalOpen: false})
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
    const id = e.target.value
    if (e.target.checked) {
      applyDeviceIds = [...applyDeviceIds, id]
    } else {
      applyDeviceIds = applyDeviceIds.filter(p => p !== id)
    }

    this.setState({applyDeviceIds})
  }

  ////////////////////////////////////////////////////

  onClickEditIncident () {
    const {allValues, brainCells} = this.props
    const {incidentTemplateId} = allValues || {}
    if (!incidentTemplateId) return null
    const entity = brainCells.filter(p => p.id === incidentTemplateId)[0]
    if (!entity) return
    this.props.showBrainCellModal(true, entity)
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
    this.props.showBrainCellModal(false)
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
  renderUserPickModal() {
    if (!this.props.userPickModalOpen) return null
    // return (
    //     <UserPickModal
    //         fetchUsers={this.props.fetchUsers}
    //         users={this.props.users}
    //         onClose={this.onCloseAddUser.bind(this)}
    //     />
    // )
  }

  renderBraincellModal () {
    if (!this.props.brainCellModalOpen) return null
    return (
      <BrainCellModal
        type={this.state.brainCellType}
        allTags={this.getTags()}
        onSave={this.onSaveBraincell.bind(this)}
        onClose={this.onCloseBraincellModal.bind(this)}

        brainCells={this.props.brainCells}
        editBrainCell={this.props.editBrainCell}

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

  renderTagPickModal () {
    if (!this.state.tagPickModalOpen) return null
    const {brainCells} = this.props
    const tags = brainCells.filter(p => p.type === 'Tag').map(p => p.name)
    return (
      <BraincellTagPickerModal
        tags={tags}
        onPick={this.onPickTag.bind(this)}
        onClose={this.onClosePickTag.bind(this)}
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

    // if (objectConfig.data.uuid) return null
    const {shape, editShape, wfData, keyField} = this.state
    const {objects} = wfData


    const tpl = extendShape(shape)
    const w = tpl.w || 120
    const h = tpl.h || 50
    const objectConfig = editShape || {
      // imgIndex: item.imgIndex,

      x: 0,
      y: 0,
      w,
      h,

      // id: this.props.lastId + 1,
      type: DiagramTypes.OBJECT,
      config: {
        ...tpl.config
      },
      fill: tpl.fill,
      data: assign({}, tpl.data)
    }

    const contents = tpl.form
    const initialValues = editShape ? {
      ...editShape.data
    } : {}
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
    }

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
        noModal
        embedded
        keyFieldMode={keyField}
      />
    )
  }

  render() {
    const {handleSubmit, groups, shapes, newView} = this.props
    const ModalView = newView ? WorkflowEditModalView1 : WorkflowEditModalView
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
        wfDataItems={this.getWfDataItems()}
        shapes={shapes}
        onClickAddShape={this.onClickAddShape.bind(this)}
        onCloseShapeMenu={this.onCloseShapeMenu.bind(this)}
        onClickShape={this.onClickShape.bind(this)}
        onClickDeleteShape={this.onClickDeleteShape.bind(this)}
        onClickEditShape={this.onClickEditShape.bind(this)}

        tags={this.state.tags}
        tagInputValue={this.state.tagInputValue}
        onChangeTagInput={this.onChangeTagInput.bind(this)}
        getTagSuggestionValue={t => t.name}
        onClickTagPick={this.onClickTagPick.bind(this)}
        onClickAddTag={this.onClickAddTag.bind(this)}
        onClickDeleteTag={this.onClickDeleteTag.bind(this)}
        onClickExistingTag={this.onClickExistingTag.bind(this)}

        active={this.state.active}
        onClickSidebarGroup={i => this.setState({active: i})}
        shapeModal={this.renderShapeModal()}
        onCloseShapeModal={this.onCloseShapeModal.bind(this)}
        rulePanelExpanded={this.state.rulePanelExpanded}
        onExpandRulePanel={this.onExpandRulePanel.bind(this)}
        onClickEditIncident={this.onClickEditIncident.bind(this)}

        applyDeviceIds={this.state.applyDeviceIds}
        onCheckAppliedDevice={this.onCheckAppliedDevice.bind(this)}
      >
        {this.renderUserPickModal()}
        {this.renderBraincellModal()}
        {this.renderTagPickModal()}
        {this.renderLoader()}
      </ModalView>
    )
  }
}

export default connect(
  (state, props) => ({
    initialValues: props.editWf || {
      type: 'normal'
    },
    allValues: getFormValues('wfNameForm')(state)
  })
)(reduxForm({form: 'wfNameForm'})(WorkflowEditModal))
