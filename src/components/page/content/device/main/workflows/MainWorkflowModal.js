import React, { Component } from 'react'
import {reduxForm} from 'redux-form'
import {assign, concat, forOwn} from 'lodash'
import { connect } from 'react-redux'
import RuleModal from './RuleModal'
import CategoryModal from './CategoryModal'
import ActionModal from './ActionModal'
import DiagramModalContainer from 'containers/page/content/device/main/workflows/DiagramModalContainer'
import { WorkflowStep1, WorkflowStep2, WorkflowStep3, WorkflowWizard,
  MainWorkflowModalView } from 'components/modal'

class MainWorkflowModal extends Component {

  constructor (props) {
    super(props)
    let rules = []
    if (props.editWorkflow) {
      forOwn(props.editWorkflow.rules || {}, (value, key) => {
        rules.push({key, value})
      })
    }
    rules.push({key: '', value: ''})
    this.state = {
      current: 1,
      steps: 3,
      rules,
      selectedRuleIndex: -1,
      actions: props.editWorkflow ? (props.editWorkflow.actions || []) : [],
      selectedActionIndex: -1,
      diagram: props.editWorkflow ? props.editWorkflow.flowchart : ''
    }
    this.onClickAddCategory = this.onClickAddCategory.bind(this)
    this.onClickRemoveRule = this.onClickRemoveRule.bind(this)
    this.onRuleChange = this.onRuleChange.bind(this)
    this.onRuleClick = this.onRuleClick.bind(this)
    this.onClickAddAction = this.onClickAddAction.bind(this)
    this.onClickEditAction = this.onClickEditAction.bind(this)
    this.onClickRemoveAction = this.onClickRemoveAction.bind(this)
    this.onActionClick = this.onActionClick.bind(this)
    this.onClickClose = this.onClickClose.bind(this)
    this.onClickPrev = this.onClickPrev.bind(this)
    this.onClickNext = this.onClickNext.bind(this)
    this.onClickDiagram = this.onClickDiagram.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentWillMount () {
    this.props.fetchWorkflowCategories()
  }

  handleFormSubmit (values) {
    const {editWorkflow, workflowCategories} = this.props
    const { rules, actions, diagram } = this.state
    let props = assign({}, editWorkflow, values, { isglobal: false, rules: {}, actions: actions, flowchart: diagram })
    if (workflowCategories && workflowCategories.length) {
      props.category = props.category || workflowCategories[0].name
    }
    rules.forEach(r => {
      if (r.key) props.rules[r.key] = r.value
    })
    if (!props.name) return window.alert('Please type name.')
    if (editWorkflow) {
      this.props.updateDeviceWorkflow(props)
    } else {
      this.props.addDeviceWorkflow(props, this.props.device)
    }
  }

  onClickClose () {
    this.props.closeDeviceWorkflowModal()
  }

  onClickPrev () {
    let { current } = this.state
    current -= 1
    this.setState({ current })
  }

  onClickNext () {
    let { current } = this.state
    current += 1
    this.setState({ current })
  }

  onClickAddRule () {
    this.props.openDeviceRuleModal()
  }

  onClickEditRule () {
    const { selectedRuleIndex, rules } = this.state
    if (selectedRuleIndex < 0) return window.alert('Please select rule.')
    this.props.openDeviceRuleModal(rules[selectedRuleIndex])
  }

  onClickRemoveRule () {
    const { selectedRuleIndex, rules } = this.state
    if (selectedRuleIndex < 0) return window.alert('Please select rule.')
    this.setState({rules: rules.filter((r, index) => index !== selectedRuleIndex), selectedRuleIndex: -1})
  }

  onCloseRuleModal (data, isEdit) {
    if (!data) return
    const { rules, selectedRuleIndex } = this.state
    if (isEdit) {
      this.setState({rules: rules.map((r, index) => index === selectedRuleIndex ? data : r)})
    } else {
      this.setState({rules: concat(rules, data)})
    }
  }

  onClickAddCategory () {
    this.props.openWfCategoryModal()
  }

  onRuleChange (index, value) {
    console.log(value)
    let { rules } = this.state
    rules = rules.map((r, i) => i === index ? assign({}, r, value) : r)
    if (index === rules.length - 1) rules.push({key: '', value: ''})
    this.setState({ rules })
  }

  onClickAddAction () {
    this.props.openWfActionModal()
  }

  onClickEditAction () {
    const { selectedActionIndex, actions } = this.state
    if (selectedActionIndex < 0) return window.alert('Please select action.')
    this.props.openWfActionModal(actions[selectedActionIndex])
  }

  onClickRemoveAction () {
    const { selectedActionIndex, actions } = this.state
    if (selectedActionIndex < 0) return window.alert('Please select action.')
    this.setState({actions: actions.filter((r, index) => index !== selectedActionIndex), selectedActionIndex: -1})
  }

  onCloseActionModal (data, isEdit) {
    if (!data) return
    const { actions, selectedActionIndex } = this.state
    if (isEdit) {
      this.setState({actions: actions.map((r, index) => index === selectedActionIndex ? data : r)})
    } else {
      this.setState({actions: concat(actions, data)})
    }
  }

  onClickDiagram () {
    this.props.openDeviceWfDiagramModal(this.state.diagram)
  }

  onDiagramModalClose (data) {
    if (!data) return
    this.setState({
      diagram: data
    })
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

  onRuleClick (index) {
    let rules = this.state.rules
    if (index !== rules.length - 1) {
      this.setState({
        selectedRuleIndex: index
      })
    }
  }

  onActionClick (index) {
    this.setState({
      selectedActionIndex: index
    })
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

export default connect(
  state => ({
    initialValues: assign({
      enable: true,
      severity: 'HIGH'
    }, state.devices.editWorkflow)
  })
)(reduxForm({form: 'workflowForm'})(MainWorkflowModal))
