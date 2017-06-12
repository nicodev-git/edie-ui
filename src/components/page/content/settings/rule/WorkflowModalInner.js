import React, { Component } from 'react'
import CategoryModal from './CategoryModal'
import ActionModal from './ActionModal'
import DiagramViewContainer from 'containers/page/content/settings/rule/DiagramViewContainer'
import { WorkflowStep0, WorkflowStep1, WorkflowStep2, WorkflowStep3, WorkflowWizard,
  MainWorkflowModalView } from 'components/modal'
import TagPickerModal from 'containers/shared/TagPickerModalContainer'

export default class WorkflowModalInner extends Component {
  onClickAddTag () {
    this.props.showWorkflowTagModal(true)
  }
  onPickTag (tag) {
    this.props.addWorkflowTag(tag.name)
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

  renderStep () {
    const {current, workflowEditType, updateWorkflowEditType, editWorkflowTags, removeWorkflowTag} = this.props
    if (current === 1) {
      return (
        <WorkflowStep0
          tags={editWorkflowTags}
          onClickAddTag={this.onClickAddTag.bind(this)}
          onClickDeleteTag={removeWorkflowTag}
          workflowEditType={workflowEditType}
          updateWorkflowEditType={updateWorkflowEditType}
          tagModal={this.renderTagsModal()}
        />
      )
    } else {
      if (workflowEditType === 'wizard') return this.renderWizardStep(current)
      return this.renderDiagramStep(current)
    }
  }

  renderWizardStep () {
    const {current, rules, selectedRuleIndex, actions, selectedActionIndex, onClickRawData} = this.props
    let categoryModal = this.renderCategoryModal()
    let ruleModal = null
    let actionModal = this.renderActionModal()

    if (current === 2) {
      return (
        <WorkflowStep1
          tags={this.props.editWorkflowTags}
          onClickDeleteTag={this.props.onClickDeleteTag}
          onClickRawData={onClickRawData}
          categories={this.props.workflowCategories}
          onAddCategory={this.props.onClickAddCategory}
          categoryModal={categoryModal}
        />
      )
    } else if (current === 3) {
      return (
        <WorkflowStep2
          onRemoveRule={this.props.onClickRemoveRule}
          rules={rules}
          onRuleChange={this.props.onRuleChange}
          onRuleClick={this.props.onRuleClick}
          ruleModal={ruleModal}
          selected={selectedRuleIndex}
          onClickKeyChip={this.props.onClickKeyChip}
          onClickValueChip={this.props.onClickValueChip}
        />
      )
    } else if (current === 4) {
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

  renderDiagramStep (current) {
    if (current === 2) {
      return (
        <div style={{margin: '-28px -15px 10px'}}>
          <DiagramViewContainer />
        </div>
      )
    }
  }

  renderWizard () {
    const {current, steps} = this.props
    let step = this.renderStep()
    let diagramModal = null
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
        onClose={this.props.onClickClose}
        onDiagram={this.props.onClickDiagram}
        onPrev={this.props.onClickPrev}
        onNext={this.props.onClickNext}
        isDiagramButton={this.props.isDiagramButton}
      />
    )
  }

  render () {
    const {onSubmit} = this.props
    let wizard = this.renderWizard()
    return (
      <MainWorkflowModalView
        onSubmit={onSubmit}
        wizard={wizard}
      />
    )
  }
}
