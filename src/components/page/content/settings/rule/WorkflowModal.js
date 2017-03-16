import React from 'react'
import Modal from 'react-bootstrap-modal'
import { reduxForm, Field } from 'redux-form'
import { concat, assign, forOwn } from 'lodash'
import Tooltip from 'react-tooltip'
import FlatButton from 'material-ui/FlatButton'

import ActionList from 'material-ui/svg-icons/action/list'
import ActionTrendingUp from 'material-ui/svg-icons/action/trending-up'

import CategoryModal from './CategoryModal'
import ActionModal from './ActionModal'
import DiagramModalContainer from 'containers/page/content/device/main/workflows/DiagramModalContainer'

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
      steps: 1,

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
    if (!this.props.wfDiagramModalOpen) return null
    return (
      <DiagramModalContainer
        commands={this.state.actions.map(a => a.command)}
        onClose={this.onDiagramModalClose.bind(this)}/>
    )
  }

  renderActionModal () {
    if (!this.props.wfActionModalOpen) return null
    return (
      <ActionModal onClose={this.onCloseActionModal.bind(this)} />
    )
  }

  renderStep () {
    const {current} = this.state

    if (current === 1) {
      return (
        <div>
          <Field name="name" component={renderInput} type="text" label="Name"/>
          <div className="row">
            <label className="col-md-3">Add By</label>
            <div className="col-md-9">
              <FlatButton icon={<ActionList />} backgroundColor="#C0C0C0"/>
              <FlatButton icon={<ActionTrendingUp />}/>
            </div>
          </div>
        </div>
      )
    } else if (current === 2) {
      return (
        <div>
          Step 2
        </div>
      )
    } else if (current === 3) {
      return (
        <div>
          Step 3
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
