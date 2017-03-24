import React, { Component } from 'react'
import {assign, concat, forOwn} from 'lodash'
import { connect } from 'react-redux'
import RuleModal from './RuleModal'
import CategoryModal from './CategoryModal'
import ActionModal from './ActionModal'
import DiagramModalContainer from 'containers/page/content/device/main/workflows/DiagramModalContainer'
import { WorkflowStep1, WorkflowStep2, WorkflowStep3, WorkflowWizard,
  MainWorkflowModalView } from 'components/modal'

class WorkflowModalInner extends Component {

  constructor (props) {
    super(props)

  }

  renderRuleModal () {
    if (!this.props.ruleModalOpen) return null
    return (
      <RuleModal {...this.props} onClose={this.onCloseRuleModal.bind(this)} />
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
      <ActionModal onClose={this.onCloseActionModal.bind(this)} />
    )
  }

  renderDiagramModal () {
    if (!this.props.wfDiagramModalOpen) return null
    return (
      <DiagramModalContainer
        commands={this.state.actions.map(a => a.command)}
        onClose={this.onDiagramModalClose.bind(this)}/>
    )
  }

  renderStep () {
    const {current, rules, selectedRuleIndex, actions, selectedActionIndex} = this.state
    let categoryModal = this.renderCategoryModal()
    let ruleModal = this.renderRuleModal()
    let actionModal = this.renderActionModal()

    if (current === 1) {
      return (
        <WorkflowStep1
          categories={this.props.workflowCategories}
          onAddCategory={this.onClickAddCategory}
          categoryModal={categoryModal}
        />
      )
    } else if (current === 2) {
      return (
        <WorkflowStep2
          onRemoveRule={this.onClickRemoveRule}
          rules={rules}
          onRuleChange={this.onRuleChange}
          onRuleClick={this.onRuleClick}
          ruleModal={ruleModal}
          selected={selectedRuleIndex}
        />
      )
    } else if (current === 3) {
      return (
        <WorkflowStep3
          onAddAction={this.onClickAddAction}
          onEditAction={this.onClickEditAction}
          onRemoveAction={this.onClickRemoveAction}
          onActionClick={this.onActionClick}
          actions={actions}
          selected={selectedActionIndex}
          actionModal={actionModal}
        />
      )
    }
    return null
  }

  renderWizard () {
    const {current, steps} = this.state
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
        onClose={this.onClickClose}
        onDiagram={this.onClickDiagram}
        onPrev={this.onClickPrev}
        onNext={this.onClickNext}
      />
    )
  }

  render () {
    const {handleSubmit} = this.props
    let wizard = this.renderWizard()

    return (
      <MainWorkflowModalView
        onClose={this.onClickClose}
        onSubmit={handleSubmit(this.handleFormSubmit)}
        wizard={wizard}
      />
    )
  }
}
