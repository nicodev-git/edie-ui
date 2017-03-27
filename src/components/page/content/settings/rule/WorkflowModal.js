import React from 'react'
import Modal from 'react-bootstrap-modal'
import { reduxForm, Field } from 'redux-form'
import { concat, assign, forOwn } from 'lodash'
import Tooltip from 'react-tooltip'
import InlineEdit from 'react-edit-inline'
import CategoryModal from './CategoryModal'
import ActionModal from './ActionModal'
import DiagramViewContainer from 'containers/page/content/settings/rule/DiagramViewContainer'
import { WorkflowStep0 } from 'components/modal'

const renderInput = field => (
  <div className="row margin-md-bottom">
    <label className={`col-md-3 ${field.type === 'checkbox' ? '' : 'control-label'}`}>{field.label}</label>
    <div className="col-md-9">
      <input {...field.input} type={field.type} className={field.type === 'text' ? 'form-control' : ''}/>
    </div>
  </div>
)

class WorkflowModal extends React.Component { // eslint-disable-line react/no-multi-comp
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
      rules,
      selectedRuleIndex: -1,
      actions: props.editWorkflow ? (props.editWorkflow.actions || []) : [],
      selectedActionIndex: -1,
      diagram: props.editWorkflow ? props.editWorkflow.flowchart : ''
    }
  }

  componentWillMount () {
    this.props.fetchWorkflowCategories()
  }

  onHide () {
    this.onClickClose()
  }

  closeModal () {
    this.props.closeWorkflowModal()
  }

  onClickClose () {
    this.closeModal()
  }

  onClickAddCategory () {
    this.props.openWfCategoryModal()
  }

  onClickRemoveRule () {
    const { selectedRuleIndex, rules } = this.state
    if (selectedRuleIndex < 0) return window.alert('Please select rule.')
    this.setState({rules: rules.filter((r, index) => index !== selectedRuleIndex), selectedRuleIndex: -1})
  }

  onRuleChange (index, value) {
    console.log(value)
    let { rules } = this.state
    rules = rules.map((r, i) => i === index ? assign({}, r, value) : r)
    if (index === rules.length - 1) rules.push({key: '', value: ''})
    this.setState({ rules })
  }

  handleFormSubmit (values) {
    const { editWorkflow, workflowCategories } = this.props
    const { rules, actions, diagram } = this.state
    let props = assign({}, editWorkflow, values, { rules: {}, actions: actions, flowchart: diagram })
    if (workflowCategories && workflowCategories.length) {
      props.category = props.category || workflowCategories[0].name
    }

    rules.forEach(r => {
      if (r.key) props.rules[r.key] = r.value
    })

    if (!props.name) return window.alert('Please type name.')

    // if (editWorkflow) {
    //   this.props.updateWorkflow(props)
    // } else {
    //   this.props.addWorkflow(props)
    // }
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

  onClickDiagram () {
    this.props.openDeviceWfDiagramModal(this.state.diagram)
  }

  onDiagramModalClose (data) {
    if (!data) return
    this.setState({
      diagram: data
    })
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

  renderCategoryModal () {
    if (!this.props.wfCategoryModalOpen) return null
    return (
      <CategoryModal />
    )
  }

  renderDiagramModal () {
  //   if (!this.props.wfDiagramModalOpen) return null
  //   return (
  //     <DiagramModalContainer
  //       commands={this.state.actions.map(a => a.command)}
  //       onClose={this.onDiagramModalClose.bind(this)}/>
  //   )
  }

  renderActionModal () {
    if (!this.props.wfActionModalOpen) return null
    return (
      <ActionModal onClose={this.onCloseActionModal.bind(this)} />
    )
  }

  renderDiagramStep (current) {
    if (current === 2) {
      return (
        <div style={{margin: '-28px -40px 10px -40px'}}>
          <DiagramViewContainer />
        </div>
      )
    }
  }

  renderWizardStep (current) {
    const {rules, selectedRuleIndex, actions, selectedActionIndex} = this.state

    if (current === 2) {
      return (
        <div>
          <Field name="desc" component={renderInput} type="text" label="Description"/>

          <div className="row margin-md-bottom">
            <label className="col-md-3 control-label">Display Incident Description</label>
            <div className="col-md-8 pr-none">
              <Field name="display_incident_desc" component="input" className="form-control"/>
            </div>
            <div className="col-md-1 text-right pl-none margin-sm-top">
              <a href="javascript:;">
                <i
                  className="fa fa-question-circle fa-x"
                  data-class="tt-workflow"
                  data-tip={`Use \${KEY} for show key’s value.<br/>Example: 'User \${user} was blocked at: \${datetime}'`}/>
              </a>
            </div>
          </div>

          <Field name="isglobal" component={renderInput} type="checkbox" label="Global"/>

          <div className="row margin-md-bottom">
            <label className="col-md-3">Category</label>
            <div className="col-md-8 pr-none">
              <Field name="category" component="select" className="form-control">
                {this.props.workflowCategories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </Field>
            </div>
            <div className="col-md-1 text-right pl-none margin-sm-top">
              <a href="javascript:;" onClick={this.onClickAddCategory.bind(this)}><i className="fa fa-plus-square fa-x"/></a>
            </div>
          </div>

          <div className="row margin-md-bottom">
            <label className="col-md-3">Severity</label>
            <div className="col-md-9">
              <Field name="severity" component="select" className="form-control">
                <option>HIGH</option>
                <option>MEDIUM</option>
                <option>LOW</option>
                <option>AUDIT</option>
                <option>IGNORE</option>
                <option>IGNOREDELETE</option>
                <option>DEVICE</option>
              </Field>
            </div>
          </div>

          <div className="row margin-md-bottom">
            <label className="col-md-3">Enabled</label>
            <div className="col-md-9">
              <Field name="enable" component="input" type="checkbox"/>
            </div>
          </div>

          {this.renderCategoryModal()}
        </div>
      )
    } else if (current === 3) {
      return (
        <div>
          <div>
            <span className="margin-md-right"><b>Rules</b></span>
            <a href="javascript:;" onClick={this.onClickRemoveRule.bind(this)} className="margin-sm-right"><i className="fa fa-trash-o"/></a>
          </div>
          <div className="margin-md-bottom">
            <table className="table table-hover">
              <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
              </thead>
              <tbody>
              {
                rules.map((r, index) =>
                  <tr key={index} className={selectedRuleIndex === index ? 'selected' : ''} onClick={() => { if (index !== rules.length - 1) this.setState({ selectedRuleIndex: index }) }}>
                    <td width="50%">
                      <InlineEdit
                        activeClassName="editing"
                        text={r.key || '\u00a0'}
                        paramName="key"
                        change={this.onRuleChange.bind(this, index)}
                        style={{
                          width: '100%',
                          display: 'block'
                        }}
                      />
                    </td>
                    <td width="50%">
                      <InlineEdit
                        activeClassName="editing"
                        text={r.value || '\u00a0'}
                        paramName="value"
                        change={this.onRuleChange.bind(this, index)}
                        style={{
                          width: '100%',
                          display: 'block'
                        }}
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )
    } else if (current === 4) {
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
  }

  renderStep () {
    const {current} = this.state
    const {workflowEditType, updateWorkflowEditType} = this.props
    if (current === 1) {
      return (
        <WorkflowStep0
          workflowEditType={workflowEditType}
          updateWorkflowEditType={updateWorkflowEditType}
        />
      )
    } else {
      if (workflowEditType === 'wizard') return this.renderWizardStep(current)
      return this.renderDiagramStep(current)
    }
  }

  getSteps () {
    const { workflowEditType } = this.props
    if (workflowEditType === 'wizard') return 4
    return 2
  }

  renderWizard () {
    const {current} = this.state
    const steps = this.getSteps()

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
            <a href="javascript:;" className="btn btn-default btn-sm margin-sm-right" onClick={this.onClickClose.bind(this)}>Cancel</a>
            <a href="javascript:;" className="btn btn-default btn-sm margin-sm-right" disabled={current === 1} onClick={this.onClickPrev.bind(this)}>Previous</a>

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
    const { handleSubmit } = this.props

    return (
      <Modal
        show
        onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >

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

export default reduxForm({
  form: 'workflowEditForm'
})(WorkflowModal)
