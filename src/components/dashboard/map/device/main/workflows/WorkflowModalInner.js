import React, { Component } from 'react'
import {Button} from '@material-ui/core'

import RuleModal from './RuleModal'
import CategoryModal from './CategoryModal'
import ActionModal from './ActionModal'
import DiagramModalContainer from 'containers/wf/DiagramModalContainer'
import { WorkflowStep1, WorkflowStep2, WorkflowStep3, WorkflowWizard,
  MainWorkflowModalView, WfParamEditModal } from 'components/modal'
import TagPickerModal from 'containers/settings/tag/TagPickerModalContainer'

export default class WorkflowModalInner extends Component {
  onClickAddTag () {
    this.props.showWorkflowTagModal(true)
  }
  onPickTag (tag) {
    this.props.addWorkflowTag(tag.name)
  }
  renderRuleModal () {
    if (!this.props.ruleModalOpen) return null
    return (
      <RuleModal {...this.props} onClose={this.props.onCloseRuleModal.bind(this)} />
    )
  }

  renderCategoryModal () {
    if (!this.props.wfCategoryModalOpen) return null
    return (
      <CategoryModal />
    )
  }

  renderActionModal () {
    if (!this.props.wfActionModalOpen) return null
    return (
      <ActionModal onClose={this.props.onCloseActionModal.bind(this)} />
    )
  }

  renderTagsModal () {
    if (!this.props.wfTagModalOpen) return null
    return (
      <TagPickerModal
        onPick={this.onPickTag.bind(this)}
        onClickClose={() => this.props.showWorkflowTagModal(false)}/>
    )
  }

  renderDiagramModal () {
    if (!this.props.wfDiagramModalOpen) return null
    return (
      <DiagramModalContainer
        commands={this.props.actions.map(a => a.command)}
        onClose={this.props.onDiagramModalClose.bind(this)}/>
    )
  }

  renderStep (step) {
    const {rules, selectedRuleIndex, actions, selectedActionIndex, onClickRawData,
      editWorkflowTags, removeWorkflowTag, editWfParams, showWfParamModal, removeWfParam} = this.props

    if (step === 1) {
      const categoryModal = this.renderCategoryModal()
      return (
        <WorkflowStep1
          tags={editWorkflowTags}
          onClickDeleteTag={removeWorkflowTag}
          onClickAddTag={this.onClickAddTag.bind(this)}
          tagModal={this.renderTagsModal()}

          onClickRawData={onClickRawData}
          categories={this.props.workflowCategories}
          onAddCategory={this.props.onClickAddCategory}
          categoryModal={categoryModal}

          editParams={editWfParams}
          onClickEditParam={p => showWfParamModal(true, p)}
          onClickRemoveParam={removeWfParam}
          onClickAddParam={() => showWfParamModal(true)}
        />
      )
    } else if (step === 2) {
      const ruleModal = this.renderRuleModal()
      return (
        <WorkflowStep2
          onRemoveRule={this.props.onClickRemoveRule}
          rules={rules}
          onRuleChange={this.props.onRuleChange}
          onRuleClick={this.props.onRuleClick}
          onClickKeyChip={this.props.onClickKeyChip}
          onClickValueChip={this.props.onClickValueChip}
          ruleModal={ruleModal}
          selected={selectedRuleIndex}
        />
      )
    } else if (step === 3) {
      const actionModal = this.renderActionModal()
      return (
        <WorkflowStep3
          onAddAction={this.props.onClickAddAction}
          onEditAction={this.props.onClickEditAction}
          onRemoveAction={this.props.onClickRemoveAction}
          onActionClick={this.props.onActionClick}
          actions={actions}
          selected={selectedActionIndex}
          actionModal={actionModal}
        />
      )
    }
    return null
  }
  renderParamEditModal () {
    if (!this.props.wfParamModalOpen) return null
    return (
      <WfParamEditModal
        editParam={this.props.editWfParam}
        addParam={this.props.addWfParam}
        updateParam={this.props.updateWfParam}
        onClose={() => this.props.showWfParamModal(false)}
      />
    )
  }
  renderWizard () {
    const {current, steps, noModal, isDiagramButton} = this.props
    const modals = (
      <div>
        {this.renderParamEditModal()}
      </div>
    )
    if (noModal) {
      return (
        <div>

          <div className="col-md-6">
            {this.renderStep(1)}
          </div>
          <div className="col-md-6">
            {this.renderStep(2)}
            {this.renderStep(3)}
          </div>
          <div className="col-md-12 margin-md-top">
            { isDiagramButton
              ? (<Button variant="raised" onClick={this.props.onClickDiagram}>Diagram</Button>) : null}
            &nbsp;
            <Button variant="raised" type="submit">Finish</Button>
          </div>
          {modals}
        </div>
      )
    } else {
      let step = this.renderStep()
      let diagramModal = this.renderDiagramModal()
      let markers = []
      for (let i = 0; i < steps; i++) {
        const cls = `marker ${current >= (i + 1) ? 'marker-checked' : ''}`
        markers.push(
          <div key={i} className={cls} style={{left: `${100 / steps * (i + 0.5)}%`}}>
            <div className="marker-label">{i + 1}</div>
          </div>
        )
      }
      return (
        <WorkflowWizard
          markers={markers}
          step={step}
          steps={steps}
          current={current}
          diagramModal={diagramModal}
          modals={modals}
          isDiagramButton={this.props.isDiagramButton}
          onClose={this.props.onClickClose}
          onDiagram={this.props.onClickDiagram}
          onPrev={this.props.onClickPrev}
          onNext={this.props.onClickNext}
        />
      )
    }

  }

  render () {
    const {onSubmit, noModal} = this.props
    let wizard = this.renderWizard()
    return (
      <MainWorkflowModalView
        noModal={noModal}
        onSubmit={onSubmit}
        wizard={wizard}
        onClose={this.props.onClickClose}
      />
    )
  }
}
