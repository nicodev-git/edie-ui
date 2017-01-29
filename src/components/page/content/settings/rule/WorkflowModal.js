import React from 'react'
import Modal from 'react-bootstrap-modal'
import {
    Button
} from 'react-bootstrap'
import { reduxForm, Field } from 'redux-form'
import { assign, forOwn } from 'lodash'

// import { showAlert } from 'components/shared/Alert'

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
      steps: 3,

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

  }

  handleFormSubmit (values) {
    const { editWorkflow } = this.props
    const { rules, actions, diagram } = this.state
    let props = assign({}, editWorkflow, values, { rules: {}, actions: actions, flowchart: diagram })
    rules.forEach(r => {
      if (r.key) props.rules[r.key] = r.value
    })

    if (!props.name) return window.alert('Please type name.')

    if (editWorkflow) {
      this.props.updateWorkflow(props)
    } else {
      this.props.addWorkflow(props)
    }
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

        <div className="modal-body bootstrap-dialog-message">

          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <Field name="name" component={renderInput} type="text" label="Name"/>
            <Field name="desc" component={renderInput} type="text" label="Description"/>
            <Field name="display_incident_desc" component={renderInput} type="text" label="Display Incident Description"/>
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

            <div className="text-right">
              <Button className="btn-primary btn-sm" type="submit">Save</Button>
              <Button className="btn-sm margin-sm-left"
                onClick={this.onClickClose.bind(this)}>Cancel</Button>
            </div>
          </form>
        </div>
      </Modal>
    )
  }
}

export default reduxForm({
  form: 'workflowEditForm'
})(WorkflowModal)
