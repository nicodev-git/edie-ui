import React from 'react'
import {merge, assign} from 'lodash'
import uuid from 'uuid'
import {Button, Dialog} from '@material-ui/core'

// import { DiagramTypes } from 'shared/global'
import {extendShape, wfTaskItems} from './diagram/DiagramItems'

import DiagramModal from 'containers/wf/DiagramModalContainer'
// import FormConfig from './diagram/FormConfig'
import MappingModal from './MappingModal'

class WorkflowEditDiagramView extends React.Component {
  onClickClose() {
    this.props.closeDeviceWfDiagramModal('workflow')
  }

  onCloseWorkflow() {
  }

  onSaveFlowObject(stateId, values, objectConfig, flow, objects) {
    // const name = values.name
    // if (!name) return false

    const object = assign({}, objectConfig)
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

    console.log(object)

    if (object.data.uuid) {
      this.props.updateFlowItem(stateId, flow, object)
    } else {
      object.data = assign(object.data, {
        uuid: uuid.v4(),
        step: Math.max.apply(null, [0, ...objects.map(u => u.data ? u.data.step : 0)]) + 1
      })
      this.props.addFlowItem(stateId, flow, object)
    }

    return true
  }

  onDeleteFlowObject(stateId, flow, selected, lines) {
    this.props.removeFlowItem(stateId, flow, selected, lines)
  }

  onToggleFlowDisable(stateId, object) {
    // const disabled = parseInt(object.data.disabled || 0, 10) ? 0 : 1
    // const props = assign({}, object.data, {
    //     disabled
    // })
    //
    // const obj = assign({}, object, {
    //     greyImg: disabled
    // })
    //
    // this.props.updateFlowItem(stateId, props, obj)
  }

  onDblClickFlowItem(stateId, flow, obj) {
    if (!obj.data || obj.data.uiprops.type !== 'GROUP') return
    // const {type} = obj.data
    // if (type === 'TASK') {
    //     this.props.showWfTaskModal(true, 'wf-task', obj.data)
    // } else if (type === 'RULE') {
    //     this.props.showWfRuleModal(true, 'wf-rule', obj.data)
    // }

    // this.props.showWfTaskModal(true, stateId, flow, 'wf-task', obj, this.props.history)

    this.props.history.push(`/workflow/${flow.name}/edititem/${obj.data.uuid}`)
  }

  onClickItemInfo(stateId, flow, obj) {
    if (!obj.data) return
    const {onClickItemInfo} = this.props
    onClickItemInfo && onClickItemInfo(flow, obj.data)
  }

  onDeleteRuleObject(stateId, flow, selected, lines) {
    this.props.removeWfRule(stateId, selected)
  }

  onChangeMapping() {
    this.props.showWfMappingModal(true)
  }

  onCloseMappingModal() {
    this.props.showWfMappingModal(false)
  }

  onSaveMapping(mapping) {
    const {selectedWorkflow} = this.props
    this.props.updateWorkflow({
      ...selectedWorkflow,
      mapping
    })
    this.onCloseMappingModal()
  }

  renderDiagramView() {
    if (!this.props.selectedWorkflow) return <div/>
    const {addFlowLine, updateFlowLine, moveFlowItems, changeFlowItemFill, noModal, shapes} = this.props

    return (
      <DiagramModal
        innerModal
        stateId="workflow"
        workflowSelect={null}
        commands={[]}
        onClose={this.onCloseWorkflow.bind(this)}
        noModal={noModal}
        shapes={shapes}

        workflowItems={shapes.map(p => extendShape(p))}

        // formContents={FormConfig.taskForm}
        onSaveDiagramObject={this.onSaveFlowObject.bind(this)}
        onToggleDisable={this.onToggleFlowDisable.bind(this)}
        onChangeMapping={this.onChangeMapping.bind(this)}

        addFlowLine={addFlowLine}
        updateFlowLine={updateFlowLine}
        moveFlowItems={moveFlowItems}
        changeFlowItemFill={changeFlowItemFill}
        onDeleteDiagramObject={this.onDeleteFlowObject.bind(this)}

        onDblClickFlowItem={this.onDblClickFlowItem.bind(this)}
        onClickItemInfo={this.onClickItemInfo.bind(this)}
      />
    )
  }

  renderWfTaskModal() {
    if (!this.props.wfTaskModalOpen) return
    const {addFlowLine, updateFlowLine, moveFlowItems, changeFlowItemFill} = this.props

    const formContents = [
      {name: 'Name', key: 'name'}
    ]

    return (
      <DiagramModal
        stateId="wf-task"
        commands={[]}
        onClose={() => this.props.showWfTaskModal(false)}

        workflowItems={wfTaskItems}

        formContents={formContents}
        onSaveDiagramObject={this.onSaveFlowObject.bind(this)}

        addFlowLine={addFlowLine}
        updateFlowLine={updateFlowLine}
        moveFlowItems={moveFlowItems}
        changeFlowItemFill={changeFlowItemFill}
        onDeleteDiagramObject={this.onDeleteFlowObject.bind(this)}
        hideInfo
      />
    )
  }

  renderMappingModal() {
    if (!this.props.wfMappingModalOpen) return null

    const {selectedWorkflow} = this.props
    return (
      <MappingModal
        workflow={selectedWorkflow}
        onSave={this.onSaveMapping.bind(this)}
        onClickClose={this.onCloseMappingModal.bind(this)}/>
    )
  }

  renderModals() {
    return (
      <div>
        {this.renderMappingModal()}
      </div>
    )
  }
  render() {
    const {noModal} = this.props

    const content = (
      <div className={noModal ? "flex-1 flex-vertical" : null}>
        {this.renderDiagramView()}
        {this.renderWfTaskModal()}
        {this.renderModals()}
        {!noModal && <Button variant="raised" label="Close" onClick={this.onClickClose.bind(this)} />}
      </div>
    )

    if (noModal) return content

    return (
      <Dialog open title={this.props.selectedWorkflow || 'Workflow'}>
        {content}
      </Dialog>
    )
  }
}

export default WorkflowEditDiagramView
