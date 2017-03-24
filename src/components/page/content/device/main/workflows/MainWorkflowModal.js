import React, { Component } from 'react'
import Modal from 'react-bootstrap-modal'
import {reduxForm} from 'redux-form'
import {assign, concat, forOwn} from 'lodash'
import { connect } from 'react-redux'
import Tooltip from 'react-tooltip'
import RuleModal from './RuleModal'
import CategoryModal from './CategoryModal'
import ActionModal from './ActionModal'
import DiagramModalContainer from 'containers/page/content/device/main/workflows/DiagramModalContainer'
import { WorkflowStep1, WorkflowStep2 } from 'components/modal'

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
  }

  componentWillMount () {
    this.props.fetchWorkflowCategories()
  }

  onHide () {

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

  renderStep () {
    const {current, rules, selectedRuleIndex, actions, selectedActionIndex} = this.state
    let categoryModal = this.renderCategoryModal()
    let ruleModal = this.renderRuleModal()

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
        <div>
          <div>
            <span className="margin-md-right"><b>Actions</b></span>
            <a href="javascript:;" onClick={this.onClickAddAction.bind(this)} className="margin-sm-right"><i className="fa fa-plus-square"/></a>
            <a href="javascript:;" onClick={this.onClickEditAction.bind(this)} className="margin-sm-right"><i className="fa fa-edit"/></a>
            <a href="javascript:;" onClick={this.onClickRemoveAction.bind(this)} className="margin-sm-right"><i className="fa fa-trash-o"/></a>
          </div>

          <div>
            <table className="table table-hover">
              <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
              </tr>
              </thead>
              <tbody>
              {
                actions.map((a, index) =>
                  <tr key={a.name} className={selectedActionIndex === index ? 'selected' : ''} onClick={() => { this.setState({ selectedActionIndex: index }) }}>
                    <td>{a.name}</td>
                    <td>{a.actionType}</td>
                  </tr>
                )
              }
              </tbody>
            </table>
          </div>

          {this.renderActionModal()}
        </div>
      )
    }
    return null
  }

  renderWizard () {
    const {current, steps} = this.state

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
      <div>

        <div className="wizard-container m-none">
          <div className="wizard-progress hidden">
            {markers}

            <div className="progress progress-striped progress-xs" style={{margin: '10px 0'}}>
              <div className="progress-bar" style={{width: `${current * 100 / steps}%`}} />
            </div>
          </div>
          {this.renderStep()}

          <div className="text-right mb-none">
            <a href="javascript:;" className="btn btn-default btn-sm margin-sm-right"
              onClick={this.onClickClose.bind(this)}>Cancel</a>
            <a href="javascript:;" className="btn btn-default btn-sm margin-sm-right"
              onClick={this.onClickDiagram.bind(this)}>Diagram</a>
            <a href="javascript:;" className="btn btn-default btn-sm margin-sm-right"
              disabled={current === 1}
              onClick={this.onClickPrev.bind(this)}>Previous</a>

            { current < steps ? <a href="javascript:;" className="btn btn-default btn-sm" onClick={this.onClickNext.bind(this)}>Next</a> : null}
            { current === steps ? <button className="btn btn-primary btn-sm" type="submit">Finish</button> : null}

          </div>
        </div>

        {this.renderDiagramModal()}

        <Tooltip place="right" event="mouseover" eventOff="mouseout" multiline effect="solid"/>
      </div>
    )
  }

  render () {
    const {handleSubmit} = this.props

    return (
      <Modal
        show
        onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary">
        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Workflow
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>
        <div className="modal-body bootstrap-dialog-message p-none">
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            { this.renderWizard() }
          </form>
        </div>
      </Modal>

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
